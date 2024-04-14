import { FC } from 'react';
import classNames from 'classnames';

type Props = {
  content: React.ReactNode;
  onClickBack: () => void;
  backgroundType?: 'static' | 'custom';
  isMegaMenu?: boolean;
};

//FixMe: think how to avoid setting 60px as a top
const MobileMenuLayout: FC<Props> = ({ content, onClickBack, backgroundType, isMegaMenu }) => (
  <div className="flyout fixed left-0 right-0 top-[60px] h-full w-full z-[51] flex lg:hidden overflow-y-auto">
    <div
      className={classNames('px-4 h-max w-full min-h-full pb-[60px]', {
        'bg-white': backgroundType === 'static',
        'flex flex-col items-center gap-y-4': !isMegaMenu,
      })}
    >
      <button onClick={onClickBack} className="w-full text-start mt-2">
        <svg id="menu-back" width="40px" height="40px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path
            className={classNames({
              'fill-black': backgroundType === 'static',
            })}
            d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
          />
          <path
            className={classNames({
              'fill-black': backgroundType === 'static',
            })}
            d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
          />
        </svg>
      </button>
      {content}
    </div>
  </div>
);

export default MobileMenuLayout;
