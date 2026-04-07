import type { FieldValues } from 'react-hook-form';
import styles from './InputField.module.scss';
import type { InputProps } from '../types';
import { Input } from '../Input';

export function InputField<T extends FieldValues = FieldValues>({ 
  label, 
  error, 
  name, 
  className, 
  size, 
  ...rest 
}: InputProps<T>) {
  const inputSize = size ?? 'default';

  return (
    <label
      className={`${styles.inputContainer} ${className || ''}`}
      htmlFor={name}
    >
      {label && <span className={styles.inputLabel}>{label}</span>}

      <Input<T>
        name={name}
        error={error}
        size={inputSize}
        {...rest}
      />

      {error && (
        <div
          className={styles.errorMessage}
          id={`${name}-error`}
          role="alert"
        >
          {error}
        </div>
      )}
    </label>
  );
}
