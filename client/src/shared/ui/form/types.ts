import type { FieldValues, Path } from 'react-hook-form';
import type { InputHTMLAttributes } from 'react';

export type inputSize = 'small' | 'default';

export type BaseInputProps<T extends FieldValues> = Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'size'> & {
  label?: string;
  error?: string;
  name: Path<T>;
  size?: inputSize;
  onlyNum?: boolean;
};
