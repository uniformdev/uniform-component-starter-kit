import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';
import Button from '../../../../components/Button';
import { formatProjectMapLink } from '../../../../utilities';
import { NavigationOneColumnMenuProps } from '.';

export const NavigationOneColumnMenu: FC<NavigationOneColumnMenuProps> = ({
  primaryButtonCopy,
  primaryButtonLink,
  primaryButtonStyle,
  secondaryButtonCopy,
  secondaryButtonLink,
  secondaryButtonStyle,
}) => (
  <div className="relative">
    <UniformSlot name="menuLinks" />
    <div className="grid md:grid-cols-12 grid-cols-5">
      <div className="col-span-5 p-4">
        {Boolean(primaryButtonCopy && primaryButtonLink) && (
          <Button
            className="mx-1"
            href={formatProjectMapLink(primaryButtonLink)}
            copy={primaryButtonCopy}
            style={primaryButtonStyle}
          />
        )}
        {Boolean(secondaryButtonCopy && secondaryButtonLink) && (
          <Button
            className="mx-1"
            href={formatProjectMapLink(secondaryButtonLink)}
            copy={secondaryButtonCopy}
            style={secondaryButtonStyle}
          />
        )}
      </div>
      <div className="hidden absolute w-[calc(100%*7/12)] h-full right-0 top-0 md:block col-span-7 bg-white z-20">
        <div className="flex h-full items-center">
          <div className="w-full [&>*]:overflow-x-hidden [&>*]:mx-auto">
            <UniformSlot name="defaultContent" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
