import { FC, Fragment, PropsWithChildren } from 'react';
import Image from '../../components/Image';
import Link from 'next/link';
import { UniformText } from '@uniformdev/canvas-react';
import { getMediaUrl } from '../../utilities';
import { FeatureProps } from '.';

export const Feature: FC<FeatureProps> = ({ icon, link }) => {
  const imageUrl = getMediaUrl(icon);

  const Wrapper = link?.path
    ? ({ children }: PropsWithChildren) => {
        return <Link href={link?.path}>{children}</Link>;
      }
    : Fragment;

  return (
    <div className="flex items-start mt-8 space-x-3">
      {Boolean(imageUrl) && (
        <div className="flex items-center justify-center flex-shrink-0 mt-1 rounded-md w-11 h-11 ">
          <Image width={100} height={100} alt="icon" className="w-10 h-10 text-indigo-50" src={imageUrl} />
        </div>
      )}
      <div>
        <Wrapper>
          <UniformText placeholder="Title goes here" parameterId="title" as="p" className="text-xl font-bold" />
        </Wrapper>
        <UniformText placeholder="Description goes here" parameterId="description" as="p" />
      </div>
    </div>
  );
};
