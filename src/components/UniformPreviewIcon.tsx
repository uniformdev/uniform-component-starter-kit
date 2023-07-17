import { FC } from 'react';
import { useUniformCurrentComposition } from '@uniformdev/canvas-react';

const UniformPreviewIcon: FC = () => {
  const { isContextualEditing } = useUniformCurrentComposition();

  if (isContextualEditing) return null;

  return (
    <div className="fixed left-6 bottom-6 cursor-default text-5xl">
      <div className="tooltip tooltip-primary tooltip-right" data-tip="Preview mode is enabled">
        💎
      </div>
    </div>
  );
};

export default UniformPreviewIcon;
