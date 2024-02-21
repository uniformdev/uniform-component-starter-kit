import { FC } from 'react';

type PlayButtonProps = {
  onClick: () => void;
};

export const PlayButton: FC<PlayButtonProps> = ({ onClick }) => (
  <button
    className="absolute w-1/5 transition hover:scale-90 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    type="button"
    aria-label="Play video"
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
