import '@/app/styles/global.scss';
import { cookies } from 'next/headers';
import '@/app/styles/theme/theme.scss';
import { StoreProvider } from '@/shared/lib';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value || 'dark';

  return (
    <html lang="ru" data-theme={theme}>
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
