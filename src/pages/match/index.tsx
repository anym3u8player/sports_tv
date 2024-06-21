import React, { useEffect, useMemo, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { fetchMatchData, fetchMatchStats } from '../../api';
import type { MatchData, LiveInfo, MatchStats } from '../../types';
import dayjs from 'dayjs';
import Tabs from '../../components/Tabs';
import Stats from './Stats';
import Player from '../../components/Player';

export const matchLoader = async ({ params }) => {
  if (params.id) {
    const match = await fetchMatchData(params.id, params.type);
    const stats = await fetchMatchStats(params.id);
    return { match, stats };
  }
  return new Response(JSON.stringify({ msg: 'data error' }), { statusText: 'No data', status: 404 });
};

const Match = () => {
  const params = useParams();
  const data = useLoaderData() as { match: MatchData, stats?: MatchStats };

  // Maintain all live URLs and the currently selected index
  const [liveUrls, setLiveUrls] = useState<LiveInfo[]>(data.match.matchinfo.live_urls);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [match, setMatch] = useState(data.match.matchinfo);
  const [stats, setStats] = useState<MatchStats | undefined>(data.stats);
  const [loading, setLoading] = useState(false);
  const [updateStamp, setUpdateStamp] = useState(0);

  const playing = useMemo(() => data.match.matchinfo.status === 0, [data.match.matchinfo.status]);

  // Update current live URL based on selected index
  const currentLive = useMemo(() => liveUrls[currentIndex], [liveUrls, currentIndex]);

  useEffect(() => {
    if (playing && params.id && params.type && updateStamp) {
      setLoading(true);
      const res1 = fetchMatchData(params.id, params.type).then((data) => setMatch(data.matchinfo));
      const res2 = fetchMatchStats(params.id).then(setStats);
      Promise.all([res1, res2]).finally(() => setLoading(false));
    }
  }, [params.id, params.type, playing, updateStamp]);

  return (
    <section>
      <div>{playing && <Player liveUrl={currentLive.url} />}</div>
      <div className="text-center mt-4">
        {playing && (
          <div className="join">
            {liveUrls.map((live, index) => (
              <button
                key={live.index}
                onClick={() => setCurrentIndex(index)}
                className={`btn btn-sm join-item ${index === currentIndex ? 'btn-primary' : ''}`}
              >
                {live.name}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="mx-auto my-4 p-2 max-w-lg rounded-lg lg:rounded-2xl shadow-xl text-center flex items-center justify-between gap-1 lg:gap-4">
        <div className="w-24 flex flex-col items-center">
          <img
            src={match.hteam_logo}
            alt={match.hteam_name}
            className="w-10 h-10"
          />
          <div className="truncate w-full">{match.hteam_name}</div>
        </div>
        <div>
          <div className="font-semibold text-lg">{match.score}</div>
          <div>{match.status_up_name}</div>
          <div>{dayjs(match.matchtime).format('YYYY-MM-DD HH:mm')}</div>
        </div>
        <div className="w-24 flex flex-col items-center">
          <img
            src={match.ateam_logo}
            alt={match.ateam_name}
            className="w-10 h-10"
          />
          <div className="truncate w-full">{match.ateam_name}</div>
        </div>
      </div>
      {playing && (
        <div className="my-4 text-center">
          <button
            className="btn btn-sm btn-success"
            disabled={loading}
            onClick={() => setUpdateStamp((t) => t + 1)}
          >
            Refresh Data
          </button>
        </div>
      )}
      <div className="mx-auto my-4 p-2 max-w-lg ">
        {stats && (
          <Tabs
            className="tabs-boxed"
            items={[
              {
                label: 'Statistics',
                value: 0,
                children: <Stats match={match} matchStats={stats} />,
              },
              {
                label: 'Team statistics',
                value: 1,
                children: null,
              },
            ]}
          />
        )}
      </div>
      <div>
        <div>status:{match.status}</div>
        <div>status_up:{match.status_up}</div>
        <div>status_up_name:{match.status_up_name}</div>
      </div>
    </section>
  )
}

export default Match
