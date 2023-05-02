import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UniformSlot, ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { BaseContainer } from '@/components/Container';
import { getImageUrl } from '@/utils';

type HeaderProps = ComponentProps<{
  logo: string | Types.CloudinaryImage;
  theme: string;
}>;

const Header: FC<HeaderProps> = ({ logo }) => (
  <div className="bg-base-300 text-primary-content">
    <BaseContainer>
      <div className="navbar px-0">
        <div className="navbar-start w-full">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost hover:bg-transparent px-0 lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content p-2 shadow w-52 bg-base-300">
              <div>
                <UniformSlot name="links" />
              </div>
            </ul>
          </div>
          <Link className="ml-8 lg:ml-0" href="/">
            <Image src={getImageUrl(logo)} width="270" height="43" alt="Uniform" />
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1 shrink-0">
            <UniformSlot name="links" />
          </ul>
          <UniformSlot name="iconLinks" />
        </div>
      </div>
    </BaseContainer>
  </div>
);

registerUniformComponent({
  type: 'header',
  component: Header,
});

export default Header;
