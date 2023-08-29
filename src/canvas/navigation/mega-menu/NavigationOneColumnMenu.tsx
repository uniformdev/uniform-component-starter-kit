import { FC } from 'react';
import { ComponentProps, UniformSlot, registerUniformComponent } from '@uniformdev/canvas-react';
import Button from '../../../components/Button';
import { formatProjectMapLink } from '../../../utilities';

type NavigationOneColumnMenuProps = ComponentProps<{
  description?: string;
  icon?: string;
  primaryButtonCopy: string;
  primaryButtonLink: Types.ProjectMapLink;
  primaryButtonStyle: Types.ButtonStyles;
  secondaryButtonCopy: string;
  secondaryButtonLink: Types.ProjectMapLink;
  secondaryButtonStyle: Types.ButtonStyles;
}>;

const NavigationOneColumnMenu: FC<NavigationOneColumnMenuProps> = ({
  primaryButtonCopy,
  primaryButtonLink,
  primaryButtonStyle,
  secondaryButtonCopy,
  secondaryButtonLink,
  secondaryButtonStyle,
}) => {
  return (
    <div className="relative">
      <UniformSlot name="menuLinks" />
      <div className="grid grid-cols-12">
        <div className="col-span-4 px-8 py-2">
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
        <div className="col-span-8 bg-white">
          <div className="absolute w-full max-w-[60%] h-full z-30 top-[10%]  right-0">
            <UniformSlot name="defaultContent" />
          </div>
        </div>
      </div>
    </div>
  );
};

registerUniformComponent({
  type: 'navigationOneColumnMenu',
  component: NavigationOneColumnMenu,
});
