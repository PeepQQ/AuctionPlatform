import type { FieldValues } from 'react-hook-form';
import styles from './checkbox.module.scss';
import type { SelectProps } from './types';

export function Select<T extends FieldValues>({ options, label, placeholder, disabled, error, name, onChange, register }: SelectProps<T>) {
  return (
    <label
      className={styles.checkboxContainer}
      htmlFor={name}
    >
      {label && <span className={styles.checkboxFieldLabel}>{label}</span>}

      <select
        {...(register ? register(name) : {})}
        disabled={disabled}
        id={name}
        name={name}
        className={`${styles.selectField} ${error ? styles.selectFieldError : ''}`}
        {...(onChange && { onChange })}
      >
        {options?.map(op =>
          <option
            key={op.name}
            value={op.value}
          >
            {op.name}
          </option>
        )}
      </select>

      {error && <div className={styles.errorMessage}>{error}</div>}
    </label>
  );
}
