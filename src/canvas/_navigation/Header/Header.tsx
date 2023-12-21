import { FC } from 'react';
import classNames from 'classnames';
import Image from '../../../components/Image';
import Link from 'next/link';
import { UniformSlot } from '@uniformdev/canvas-react';
import { ScreenContainer } from '../../../components/Container';
import { getMediaUrl } from '../../../utilities';
import { getHeaderColor, getLinksAlignment } from './helpers';
import { HeaderProps } from '.';

export const Header: FC<HeaderProps> = ({ logo, component, linksAlignment }) => (
  <div className={classNames('text-primary-content', getHeaderColor(component.variant))}>
    <ScreenContainer>
      <div className="navbar px-0">
        <div className="navbar-start w-full">
          <div className="dropdown">
            <div tabIndex={0} className="btn btn-ghost hover:bg-transparent px-0 lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-compact dropdown-content shadow bg-base-300 min-w-max z-50">
              <UniformSlot name="links" />
            </ul>
          </div>
          <Link className="ml-8 lg:ml-0" href="/">
            <Image src={getMediaUrl(logo)} width="270" height="43" alt="Uniform" />
          </Link>
          <div className={classNames('hidden lg:flex w-full', getLinksAlignment(linksAlignment))}>
            <ul className="menu menu-horizontal px-1 py-0 shrink-0">
              <UniformSlot name="links" />
            </ul>
          </div>
        </div>
        <div className="hidden md:flex">
          <UniformSlot name="iconLinks" emptyPlaceholder={null} />
        </div>
      </div>
    </ScreenContainer>
  </div>
);
