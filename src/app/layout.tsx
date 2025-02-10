import { ReactNode } from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { UniformContext } from '@uniformdev/canvas-next-rsc';
import '@/styles/globals.css';
import '@/styles/colors.css';
import '@/styles/dimensions.css';
import '@/styles/fonts.css';
import '@/styles/borders.css';
import { customFontVariables } from '@/fonts';
import { UniformClientContext } from '@/utils/clientContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={customFontVariables}>
        <NextThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <UniformContext clientContextComponent={UniformClientContext}>{children}</UniformContext>
        </NextThemeProvider>
      </body>
    </html>
  );
}
