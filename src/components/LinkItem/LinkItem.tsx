import { FC } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import type { Asset } from '@uniformdev/assets';
import { REGEX_COLOR_HEX, getMediaUrl } from '../../utilities';
import { getHoverTextColor, getTextColor } from '../../utilities/styling';
import Image from '../Image';

type Props = {
  title: string;
  link: Types.ProjectMapLink;
  icon?: Asset;
  isCurrentRoute: boolean;
  hideIconBackground: boolean;
  showArrow?: boolean;
  color?: string;
  styles?: {
    link?: string;
    activeLink?: string;
  };
  isHovered?: boolean;
};

const DEFAULT_COLOR = '#fff';

const LinkItem: FC<Props> = ({
  title,
  link,
  icon,
  hideIconBackground,
  styles,
  isCurrentRoute,
  isHovered,
  color = DEFAULT_COLOR,
  showArrow,
}) => {
  const currentColor = REGEX_COLOR_HEX.test(color || DEFAULT_COLOR) ? color : undefined;

  const Wrapper = showArrow ? 'div' : Link;

  const iconUrl = getMediaUrl(icon);

  return (
    <Wrapper
      className={classNames('!rounded-none px-6 text-2xl lg:text-base  flex items-center grow', styles?.link, {
        'font-extrabold': isCurrentRoute,
        [styles?.activeLink || '']: isCurrentRoute,
      })}
      href={link?.path || '#'}
    >
      {iconUrl && (
        <div
          className={classNames('flex flex-none items-center justify-center rounded-lg mr-2', {
            'bg-base-200 p-2': !hideIconBackground,
          })}
        >
          <div className="relative w-6 h-6">
            <Image fill alt={icon?.fields?.title?.value || 'link icon'} src={iconUrl} />
          </div>
        </div>
      )}
      <div
        className={classNames(
          'flex items-center brightness-90 hover:brightness-200 active:brightness-200 focus:brightness-200',
          {
            [getTextColor(color as Types.ThemeColorsValues)]: !currentColor,
            [getHoverTextColor(color as Types.ThemeColorsValues)]: !currentColor,
          }
        )}
        style={{ color: currentColor }}
      >
        <span>{title}</span>
        {showArrow && (
          <svg
            className={classNames('ml-1 transition-all transform hidden lg:block', {
              'rotate-180': isHovered,
            })}
            width="15px"
            height="15px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
              fill="#fff"
            />
          </svg>
        )}
      </div>
    </Wrapper>
  );
};

export default LinkItem;
