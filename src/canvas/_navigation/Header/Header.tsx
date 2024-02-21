import { FC, useCallback } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { UniformSlot } from '@uniformdev/canvas-react';
import Image from '../../../components/Image';
import { ScreenContainer } from '../../../components/Container';
import { getMediaUrl } from '../../../utilities';
import { getHeaderColor, getLinksAlignment } from './helpers';
import { HeaderProps } from '.';
import { MobileView } from './MobileView';

export const Header: FC<HeaderProps> = ({ logo, component, linksAlignment }) => {
  const router = useRouter();

  const handleHomeButtonClick = useCallback(async () => {
    await router.push('/');
    /*
          FixMe: This workaround addresses the issue related to locale change not being reflected inside the next context when running app locally.
          Our investigation revealed that the middleware is causing this problem. Upon removing the middleware, the locale change functions properly.
          Surprisingly, even when our middleware remains intact but the middleware matcher is removed, the locale change functions as expected.
          When deployed to Vercel, works fine
        */
    if (!process.env.NEXT_PUBLIC_VERCEL_URL) {
      window.location.reload();
    }
  }, [router]);

  return (
    <header className={classNames('text-primary-content relative', getHeaderColor(component.variant))}>
      <ScreenContainer>
        <div className="navbar px-0">
          <div className="navbar-start w-full">
            <div className="lg:hidden">
              <MobileView
                component={component}
                wrapperClassName={getHeaderColor(component.variant)}
                logo={
                  <button className="ml-8 lg:ml-0" onClick={handleHomeButtonClick}>
                    <Image src={getMediaUrl(logo)} width="270" height="43" alt="Uniform" />
                  </button>
                }
              />
            </div>
            <button className="ml-8 lg:ml-0" onClick={handleHomeButtonClick}>
              <Image src={getMediaUrl(logo)} width="270" height="43" alt="Uniform" />
            </button>
            <div className={classNames('hidden lg:flex w-full', getLinksAlignment(linksAlignment))}>
              <ul className="menu menu-horizontal px-1 py-0 shrink-0">
                <UniformSlot name="links" />
              </ul>
            </div>
          </div>
          <div className="hidden md:flex gap-x-2">
            <UniformSlot name="iconLinks" emptyPlaceholder={null} />
          </div>
        </div>
      </ScreenContainer>
    </header>
  );
};
