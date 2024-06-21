import React from 'react'
import type { Match } from '../types'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

interface Props {
  match: Match
}

// Funcția de conversie a datei și orei din CST în UTC
function convertCSTtoUTC(date: string): string {
  const localTime = dayjs(date);
  const utcTime = localTime.subtract(7, 'hour');
  return utcTime.format('YYYY-MM-DD HH:mm');
}

const MatchCard: React.FC<Props> = ({ match }) => {
  let statusName;
  if (match.status_up_name === '未开赛') {
    statusName = 'Not started yet';
  } else if (match.status_up_name === '上半场') {
    statusName = 'First Half';
  } else if (match.status_up_name === '中场') {
    statusName = 'Midfield';
  } else if (match.status_up_name === '完场') {
    statusName = 'Finished';
  } else if (match.status_up_name === '下半场') {
    statusName = 'Second Half';
  } else {
    statusName = match.status_up_name;
  }

  return (
    <Link
      to={`/match/${match.id}/${match.type}`}
      className="rounded-lg lg:rounded-2xl bg-base-300 shadow-xl text-center flex items-center justify-between gap-1 lg:gap-4"
    >
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
        <div>{statusName}</div>
        <div>{convertCSTtoUTC(match.matchtime)} UTC</div> {/* Afișează data și ora în UTC */}
      </div>
      <div className="w-24 flex flex-col items-center">
        <img
          src={match.ateam_logo}
          alt={match.ateam_name}
          className="w-10 h-10"
        />
        <div className="truncate w-full">{match.ateam_name}</div>
      </div>
    </Link>
  )
}

export default MatchCard
