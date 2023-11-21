export interface Category {
  id: number
  logo: string
  name: string
  name_zh: string
  type: number
}

export interface LiveInfo {
  room_num: number
  streamId?: string
  name: string
  index: number
  url: string
  seq: number
  status: number
}

export interface Match {
  matchtime_en: string
  ouzhi_jishi: string
  type: number
  score: string
  status_up: number
  video_url: string
  id: number
  ateam_logo: string
  hteam_name: string
  yazhi_jishi: string
  level: number
  hteam_id: number
  daxiao_jishi: string
  zoneIdString: string
  clogo: string
  live_cartoon_url: unknown[]
  away_score_xiaojie?: number[]
  mirror_live_urls: LiveInfo[]
  cur_round: number
  live_urls: LiveInfo[]
  ateam_id: number
  matchtime: string
  status_up_name: string
  name: string
  ateam_name: string
  time: string
  hteam_logo: string
  cid: number
  status: number
  home_score_xiaojie?: number[]
  global_live_urls: LiveInfo[]
  hteam_red?: number
  jiaoqiu?: string
  hteam_yellow?: number
  ateam_red?: number
  banchang?: string
  ateam_yellow?: number
}

export interface HotPageData {
  total: number
  totalPage: number
  notopList: Match[]
  dataList: Match[]
  topList: Match[]
  live_type: number
  starttime: string
  currentPage: number
  token: string
}

export interface HotData {
  msg: string
  code: string
  data: HotPageData
}

export interface MatchInfo {
  matchtime_en: string;
  hteam_id: number;
  zoneIdString: string;
  live_cartoon_url: unknown[];
  type: number;
  mirror_live_urls: LiveInfo[];
  score: string;
  status_up: number;
  video_url: string;
  live_urls: LiveInfo[];
  ateam_id: number;
  matchtime: string;
  status_up_name: string;
  name: string;
  id: number;
  ateam_name: string;
  ateam_logo: string;
  time: string;
  hteam_name: string;
  hteam_logo: string;
  cid: number;
  name_en: string;
  status: number;
  global_live_urls: LiveInfo[];
}
export interface MatchData {
  matchinfo: MatchInfo;
  online_num: number;
  likeMatchList: unknown[];
  live_type_onoff: string;
  haslineup: number;
  hascount: number;
}