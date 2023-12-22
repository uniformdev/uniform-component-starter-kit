import { FC, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Image from '../Image';
import { MenuLinkProps, NavigationOneColumnMenuLinkVariant } from '.';

const MenuLink: FC<MenuLinkProps> = ({ link, title, description, imageUrl, variant }) => {
  const router = useRouter();

  const isCurrentRoute = useMemo(() => {
    const { asPath } = router;
    const [pathWithoutQuery] = asPath.split('?');
    return link?.path === '/' ? asPath === link?.path : pathWithoutQuery.includes(link?.path || '');
  }, [router, link]);

  return (
    <Link className={classNames('!rounded-none')} href={link?.path || '#'}>
      <div className="py-2">
        <div
          className={classNames('flex items-center justify-between', {
            'flex-row-reverse !justify-end gap-2': variant === NavigationOneColumnMenuLinkVariant.IconLeft,
          })}
        >
          <div>
            <p className={classNames({ 'font-extrabold': isCurrentRoute })}>{title}</p>
            {Boolean(description) && <p className="text-xs max-w-[150px] whitespace-break-spaces">{description}</p>}
          </div>
          {imageUrl && (
            <div className="flex items-center justify-center mt-1 rounded-md w-11">
              <Image width={100} height={100} alt="icon" className="w-10 h-10 text-indigo-50 " src={imageUrl} />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MenuLink;
