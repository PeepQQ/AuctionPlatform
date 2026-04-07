import type { UseFormRegister, FieldValues } from 'react-hook-form';
import type { BaseInputProps } from '../types';

export type TextareaProps<T extends FieldValues> = BaseInputProps<T> &
  (
    | {
        onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
        register?: never;
      }
    | {
        register: UseFormRegister<T>;
        onChange?: never;
      }
  );
