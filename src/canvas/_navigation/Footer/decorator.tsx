import dynamic from 'next/dynamic';
import Image from '../../../components/Image';
import { ScreenContainer } from '../../../components/Container';

const BuildTimestamp = dynamic(() => import('../../../components/BuildTimestamp'), { ssr: false });

// This placeholder is used as a background on the visual editing workspace of the patterns
// Activate visual editing doc: https://docs.uniform.app/docs/guides/composition/visual-editing/activate-visual-editing
export const FooterPlaceholder = () => (
  <div className="bg-secondary">
    <ScreenContainer>
      <footer className="footer py-10 flex flex-col-reverse md:flex-row justify-between border-info-content w-full">
        <div className="w-full md:w-1/2">
          <Image
            src="https://res.cloudinary.com/uniform-demos/image/upload/v1692277568/csk-icons/Uniform_Logo_Black_hb6a69_kxy6lz.svg"
            width="200"
            height="50"
            alt="Uniform"
          />
          <BuildTimestamp />
          <div
            className="footer-content text-secondary-content"
            dangerouslySetInnerHTML={{ __html: '2024 Uniform Systems, Inc. All rights reserved.' }}
          />
          <div className="footer-content text-secondary-content">
            <span>
              Built with 💙 by folks at Uniform , standing on the shoulders of these awesome open source projects:
              TailwindCSS , DaisyUI , React , and Next.js . Deployed to Vercel .
            </span>
          </div>
        </div>
        <div>
          <span className="footer-title opacity-100 text-primary">KEY RESOURCES</span>
          <li>Documentation</li>
          <li>Storybook</li>
          <li>Demo</li>
        </div>
        <div className="flex">
          <Image
            src="https://res.cloudinary.com/uniform-demos/image/upload/v1692277665/csk-icons/storybook_n7x1fd_s5rm32.svg"
            width="24"
            height="24"
            alt="iconLink"
          />
          <Image
            src="https://res.cloudinary.com/uniform-demos/image/upload/v1692277704/csk-icons/github-black_izszuz_voscka.svg"
            width="24"
            height="24"
            alt="iconLink"
          />
        </div>
      </footer>
    </ScreenContainer>
  </div>
);
