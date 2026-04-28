import type { UseFormRegister, FieldValues } from 'react-hook-form';
import type { BaseInputProps } from '../types';

export type selectOption = {
  name: string;
  value: string | number;
}

export type SelectProps<T extends FieldValues> = BaseInputProps<T> &
  (
    | {
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
        register?: never;
        options?: selectOption[]
      }
    | {
        register: UseFormRegister<T>;
        onChange?: never;
        options?: selectOption[]
      }
  );
