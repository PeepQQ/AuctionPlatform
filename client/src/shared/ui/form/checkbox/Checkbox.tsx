import type { FieldValues } from 'react-hook-form';
import styles from './checkbox.module.scss';
import type { CheckboxProps } from './types';

export function Checkbox<T extends FieldValues>({ label, placeholder, type = 'checkbox', disabled, error, name, onChange, register }: CheckboxProps<T>) {
  return (
    <label
      className={styles.checkboxContainer}
      htmlFor={name}
    >
      {label && <span className={styles.checkboxFieldLabel}>{label}</span>}

      <input
        {...(register ? register(name) : {})}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        id={name}
        name={name}
        className={`${styles.checkboxField} ${error ? styles.checkboxFieldError : ''}`}
        {...(onChange && { onChange })}
      />

      {error && <div className={styles.errorMessage}>{error}</div>}
    </label>
  );
}
