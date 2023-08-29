import { FC, SyntheticEvent, useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { ComponentProps, UniformSlot, registerUniformComponent } from '@uniformdev/canvas-react';
import { getImageUrl } from '../../../utilities';

type LinkProps = ComponentProps<{
  title: string;
  link: Types.ProjectMapLink;
  description?: string;
  icon?: string;
}>;

export enum NavigationOneColumnMenuLinkVariant {
  IconLeft = 'iconLeft',
}

const NavigationOneColumnMenuLink: FC<LinkProps> = ({ title, link, icon, description, component }) => {
  const [showHoverItem, setShowHoverItem] = useState<boolean>(false);

  const toggleShowHoverItem = useCallback(
    (e: SyntheticEvent<HTMLDivElement>) => setShowHoverItem(e.type !== 'mouseleave'),
    []
  );

  const imageIrl = getImageUrl(icon);

  const router = useRouter();

  const isCurrentRoute = useMemo(() => {
    const { asPath } = router;
    const [pathWithoutQuery] = asPath.split('?');

    if (link?.path === '/') {
      return asPath === link?.path;
    }

    return pathWithoutQuery.includes(link?.path);
  }, [router, link]);

  const renderLink = () => {
    return (
      <Link className={classNames('!rounded-none')} href={link?.path || '#'}>
        <div className="py-2">
          <div
            className={classNames('flex items-center justify-between', {
              'flex-row-reverse': component?.variant === NavigationOneColumnMenuLinkVariant.IconLeft,
            })}
          >
            <div>
              <p className={classNames({ 'font-extrabold': isCurrentRoute })}>{title}</p>
              {Boolean(description) && <p className="text-xs max-w-[150px]">{description}</p>}
            </div>
            <div className="flex items-center justify-center mt-1 rounded-md w-11">
              {imageIrl && (
                <Image width={100} height={100} alt="icon" className="w-10 h-10 text-indigo-50 " src={imageIrl} />
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  };

  const renderHoverItem = () => (
    <div className="absolute w-full max-w-[60%] h-full z-50 top-[10%] right-0">
      {showHoverItem && (
        <div className="w-full bg-white">
          <UniformSlot name="hoverContent" />
        </div>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-12">
      <div onMouseEnter={toggleShowHoverItem} onMouseLeave={toggleShowHoverItem} className="col-span-4 px-4 py-2">
        {renderLink()}
      </div>
      <div className="col-span-8 bg-white">{renderHoverItem()}</div>
    </div>
  );
};

[undefined, NavigationOneColumnMenuLinkVariant.IconLeft].forEach(variantId =>
  registerUniformComponent({
    type: 'navigationOneColumnMenuLink',
    component: NavigationOneColumnMenuLink,
    variantId,
  })
);
