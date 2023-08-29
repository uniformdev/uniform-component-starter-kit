import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { getImageUrl } from '../../utilities';
type IconLinkProps = ComponentProps<{
  link: Types.ProjectMapLink;
  icon: string | Types.CloudinaryImage;
}>;

const IconLink: FC<IconLinkProps> = ({ icon, link }) => {
  const imageUrl = getImageUrl(icon);
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

registerUniformComponent({
  type: 'iconLink',
  component: IconLink,
});
