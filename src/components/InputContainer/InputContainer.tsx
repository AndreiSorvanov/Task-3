import { ChangeEvent } from 'react';
import styles from './InputContainer.module.css';
import { FormControl, InputLabel, Input } from '@mui/material';

interface IInputContainerProps {
  id: string;
  type: string;
  label: string;
  value: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  error: string;
  isTouched: boolean;
  isReadonly?: boolean;
}

export function InputContainer({ id, type, label, value, onChange, error, isTouched, isReadonly = false }: IInputContainerProps) {
  return (
    <FormControl fullWidth variant='standard' margin='dense' color={Boolean(error) ? 'error' : 'primary'}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input id={id} className={styles.input} type={type} value={value} onChange={onChange} aria-invalid={Boolean(error)} aria-required='true' readOnly={isReadonly} error={Boolean(error)} />
      {isTouched && error && <div className={styles.error}>{error}</div>}
    </FormControl>
  );
}
