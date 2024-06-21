import React, { memo, useEffect } from 'react'

interface Props {
  liveUrl?: string
  onEnd?: () => void
  onTimeUpdate?: (seek: number) => void
  seek?: number
}

const HlsPlayer: React.FC<Props> = ({ liveUrl }) => {
  useEffect(() => {
    // Add any necessary cleanup or additional side effects here if needed.
    return () => {
      // Cleanup if necessary.
    }
  }, [liveUrl])

  if (!liveUrl) {
    return <div>No live URL provided</div>
  }

  return (
    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%' }}>
      <iframe
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        webkitAllowFullScreen
        mozallowfullscreen
        allowFullScreen
        width="640"
        height="360"
        frameBorder="0"
        allow="autoplay"
        src={`https://anym3u8player.com/tv/p.php?url=${liveUrl}`}
      ></iframe>
    </div>
  )
}

export default memo(HlsPlayer)
