import type { FieldValues } from 'react-hook-form';
import styles from './textarea.module.scss';
import type { TextareaProps } from './types';

export function Textarea<T extends FieldValues>({ label, placeholder, disabled, error, name, onChange, register }: TextareaProps<T>) {
  return (
    <label
      className={styles.textareaContainer}
      htmlFor={name}
    >
      {label && <span className={styles.textareaFieldLabel}>{label}</span>}

      <textarea
        {...(register ? register(name) : {})}
        placeholder={placeholder}
        disabled={disabled}
        id={name}
        name={name}
        className={`${styles.textareaField} ${error ? styles.textareaFieldError : ''}`}
        {...(onChange && { onChange })}
      />

      {error && <div className={styles.errorMessage}>{error}</div>}
    </label>
  );
}
