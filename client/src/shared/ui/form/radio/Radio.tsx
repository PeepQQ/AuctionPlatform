import type { FieldValues } from 'react-hook-form';
import styles from './Radio.module.scss';
import type { RadioProps } from './types';

export function Radio<T extends FieldValues>({ label, placeholder, disabled, error, name, onChange, register }: RadioProps<T>) {
  return (
    <label
      className={styles.radioContainer}
      htmlFor={name}
    >
      {label && <span className={styles.radioFieldLabel}>{label}</span>}

      <input
        {...(register ? register(name) : {})}
        type="radio"
        placeholder={placeholder}
        disabled={disabled}
        id={name}
        name={name}
        className={`${styles.radioField} ${error ? styles.radioFieldError : ''}`}
        {...(onChange && { onChange })}
      />

      {error && <div className={styles.errorMessage}>{error}</div>}
    </label>
  );
}
