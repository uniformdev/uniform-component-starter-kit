import { FC, useCallback, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { registerUniformComponent, ComponentProps } from '@uniformdev/canvas-react';
import classNames from 'classnames';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

export type Props = ComponentProps<{
  url: Types.ProjectMapLink;
  loop?: boolean;
  controls: boolean;
  lazyLoad?: boolean;
  placeholderImage?: string;
  muted: boolean;
}>;

type PlayButtonProps = {
  onClick: () => void;
};

const ASPECT_RATION_PADDING = '56.25%';

const PlayButton: FC<PlayButtonProps> = ({ onClick }) => (
  <button
    className={classNames(
      'absolute w-1/5 transition hover:scale-90 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
    )}
    type="button"
    aria-label="Play Video"
    onClick={onClick}
  >
    <svg className="w-full h-full" viewBox="0 0 123 123" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        className="fill-primary group-hover/video:fill-aqua-squeeze"
        cx="61.5"
        cy="61.5"
        r="61.5"
        fillOpacity="0.922864"
      />
      <path
        className="fill-turquoise"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M82.7064 62.0304L48.7754 81.6468V42.4141L82.7064 62.0304Z"
        stroke="white"
      />
    </svg>
  </button>
);

const Video: FC<Props> = ({ url, loop, controls, lazyLoad, placeholderImage, muted }) => {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef(null);

  const onPlay = useCallback(() => {
    setPlaying(true);
  }, []);

  const onPause = useCallback(() => {
    setPlaying(false);
  }, []);

  return (
    <div className="border-2 border-white group/video relative">
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
            style={{ position: 'absolute' }}
            light={lazyLoad ? placeholderImage || true : false}
            playIcon={<PlayButton onClick={onPlay} />}
          />
        </div>
      )}
    </div>
  );
};

registerUniformComponent({
  type: 'video',
  component: Video,
});

export default Video;
