import { FC, useCallback, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { VideoProps } from '.';
import { PlayButton } from './PlayButton';
import { getMediaUrl } from '../../utilities';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

const ASPECT_RATION_PADDING = '56.25%';

export const Video: FC<VideoProps> = ({
  url,
  autoPlay = false,
  loop,
  controls,
  lazyLoad = false,
  placeholderImage,
  muted,
}) => {
  const [playing, setPlaying] = useState(autoPlay);
  const playerRef = useRef(null);

  const onPlay = useCallback(() => setPlaying(true), []);

  const onPause = useCallback(() => setPlaying(false), []);

  return (
    <div className="w-full h-full border-2 border-white group/video relative [&_video]:!object-cover">
      {url && (
        <div style={{ paddingBottom: ASPECT_RATION_PADDING }}>
          <ReactPlayer
            ref={playerRef}
            url={url.path}
            playing={playing}
            onPause={onPause}
            onPlay={onPlay}
            width="100%"
            height="100%"
            controls={controls}
            muted={muted}
            loop={loop}
            style={{ position: 'absolute', left: 0, top: 0 }}
            light={(lazyLoad && getMediaUrl(placeholderImage)) || lazyLoad}
            playIcon={<PlayButton onClick={onPlay} />}
          />
        </div>
      )}
    </div>
  );
};
