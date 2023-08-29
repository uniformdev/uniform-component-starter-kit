import { FC } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { UniformSlot, ComponentProps, registerUniformComponent, UniformRichText } from '@uniformdev/canvas-react';
import { ScreenContainer } from '../../components/Container';
import { getImageUrl } from '../../utilities';

const BuildTimestamp = dynamic(() => import('../../components/BuildTimestamp'), { ssr: false });

type FooterProps = ComponentProps<{
  logo: string | Types.CloudinaryImage;
  displayBuildTimestamp?: boolean;
  copyright: string;
  footerText?: string;
}>;

const Footer: FC<FooterProps> = ({ logo, displayBuildTimestamp = false, copyright }) => {
  const imageUrl = getImageUrl(logo);
  return (
    <ScreenContainer>
      <footer className="footer py-10 flex flex-col-reverse md:flex-row justify-between border-t-[1px] border-info-content w-full">
        <div className="w-full md:w-1/2">
          <Image src={imageUrl} width="200" height="50" alt="Uniform" />
          {displayBuildTimestamp && <BuildTimestamp />}
          <div
            className="footer-content text-secondary-content"
            dangerouslySetInnerHTML={{ __html: `2023 ${copyright}` }}
          />
          <div className="footer-content text-secondary-content">
            <UniformRichText parameterId="footerText" />
          </div>
        </div>
        <UniformSlot name="section" />
        <div className="flex">
          <UniformSlot name="iconLinks" />
        </div>
      </footer>
    </ScreenContainer>
  );
};

registerUniformComponent({
  type: 'footer',
  component: Footer,
});

export default Footer;
