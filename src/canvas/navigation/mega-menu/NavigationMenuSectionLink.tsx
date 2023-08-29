import { FC, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import classNames from 'classnames';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { getImageUrl } from '../../../utilities';

type LinkProps = ComponentProps<{
  title: string;
  link: Types.ProjectMapLink;
  description?: string;
  icon?: string;
}>;

export enum NavigationMenuSectionLinkVariant {
  IconLeft = 'iconLeft',
}

const NavigationMenuSectionLink: FC<LinkProps> = ({ title, link, icon, description, component }) => {
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

  return (
    <Link className={classNames('!rounded-none')} href={link?.path || '#'}>
      <div className="py-2">
        <div
          className={classNames('flex items-center justify-between', {
            'flex-row-reverse': component?.variant === NavigationMenuSectionLinkVariant.IconLeft,
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

[undefined, NavigationMenuSectionLinkVariant.IconLeft].forEach(variantId =>
  registerUniformComponent({
    type: 'navigationMenuSectionLink',
    component: NavigationMenuSectionLink,
    variantId,
  })
);
