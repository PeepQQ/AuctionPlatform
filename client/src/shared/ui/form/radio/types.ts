import type { UseFormRegister, FieldValues } from 'react-hook-form';
import type { BaseInputProps } from '../types';

export type RadioProps<T extends FieldValues> = BaseInputProps<T> &
  (
    | {
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        register?: never;
      }
    | {
        register: UseFormRegister<T>;
        onChange?: never;
      }
  );
