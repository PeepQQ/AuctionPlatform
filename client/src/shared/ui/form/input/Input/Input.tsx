import type { InputHTMLAttributes } from 'react';
import type { FieldValues, UseFormRegister, Path } from 'react-hook-form';
import styles from './Input.module.scss';
import type { inputSize } from '@shared/ui/form/types';

type InputProps<T extends FieldValues> = Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'size'> & {
  name: Path<T>;
  error?: string;
  size?: inputSize;
  onlyNum?: boolean;
} & (
    | {
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        register?: never;
      }
    | {
        register: UseFormRegister<T>;
        onChange?: never;
      }
  );

export function Input<T extends FieldValues = FieldValues>({
  name,
  onChange,
  size,
  register,
  error,
  onlyNum,
  ...rest
}: InputProps<T>) {
  const inputSize = size ?? 'default';
  const reg = register ? register(name) : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onlyNum) {
      const next = e.target.value.replace(/\D/g, '');
      if (next !== e.target.value) {
        e.target.value = next;
      }
    }
    if (reg) {
      reg.onChange(e);
    } else if (onChange) {
      onChange(e);
    }
  };

  return (
    <input
      {...(reg ? { ...reg, onChange: handleChange } : {})}
      {...rest}
      id={name}
      name={name}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
      className={`${styles.inputField} ${error ? styles.inputFieldError : ''} ${styles[inputSize]}`}
      {...(!reg && onChange ? { onChange: handleChange } : {})}
      {...(onlyNum ? { inputMode: 'numeric' as const, pattern: '[0-9]*' } : {})}
    />
  );
}
