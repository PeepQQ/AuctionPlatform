import styles from './page.module.scss';
import { SignInContent } from '@widgets/signIn/ui/SignInContent';

export default function SignInPage() {
  return (
    <div className={`${styles.page} container`}>
      <SignInContent />
    </div>
  );
}
