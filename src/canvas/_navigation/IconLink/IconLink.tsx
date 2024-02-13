import { FC } from 'react';
import Link from 'next/link';
import Image from '../../../components/Image';
import { getMediaUrl } from '../../../utilities';
import { IconLinkProps } from '.';

export const IconLink: FC<IconLinkProps> = ({ icon, link }) => {
  const imageUrl = getMediaUrl(icon);

  if (!link || !imageUrl) return null;
  return (
    <Link
      target={link.path.includes('http') ? '_blank' : '_self'}
      className="[&:not(:last-child)]:mr-3 shrink-0"
      href={link?.path || '#'}
    >
      <Image src={imageUrl} width="24" height="24" alt="iconLink" />
    </Link>
  );
};
