import '@/app/styles/global.scss';
import { cookies } from 'next/headers';
import '@/app/styles/theme/theme.scss';
import { StoreProvider } from '@/shared/lib';
import { UserProvider } from '@/shared/lib/providers/UserProvider';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value || 'dark';

  return (
    <html lang="ru" data-theme={theme}>
      <body>
        <StoreProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
