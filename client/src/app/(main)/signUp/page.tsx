import styles from './page.module.scss';
import { SignUpContent } from '@widgets/signUp/ui/SignUpContent';

export default function SignUpPage() {
  return (
    <div className={`${styles.page} container`}>
      <SignUpContent />
    </div>
  );
}
