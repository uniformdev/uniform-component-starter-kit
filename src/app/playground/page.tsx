import { UniformPlayground, UniformPlaygroundProps } from '@uniformdev/canvas-next-rsc';
import { emptyPlaceholderResolver } from '@uniformdev/theme-pack/components/canvas/emptyPlaceholders';
import { ThemePackProvider } from '@uniformdev/theme-pack/components/providers/server';
import { componentResolver } from '@/components';

export default async function PlaygroundPage(props: { searchParams: UniformPlaygroundProps['searchParams'] }) {
  return (
    <ThemePackProvider>
      <UniformPlayground
        {...props}
        resolveComponent={componentResolver}
        resolveEmptyPlaceholder={emptyPlaceholderResolver}
      />
    </ThemePackProvider>
  );
}
