import styles from './SelectContainer.module.css';
import { FormControl, InputLabel, Select, SelectChangeEvent, MenuItem } from '@mui/material';

export interface IOption {
  value: string;
  text: string;
}

interface IInputContainerProps {
  id: string;
  label: string;
  value: string;
  options: Array<IOption>
  onChange: (event: SelectChangeEvent<string>) => void;
  error: string;
  isTouched: boolean;
  isReadonly?: boolean;
}

export function SelectContainer({ id, label, value, options, onChange, error, isTouched, isReadonly = false }: IInputContainerProps) {
  return (
    <FormControl fullWidth variant='standard' margin='dense' color={Boolean(error) ? 'error' : 'primary'}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select id={id} className={styles.input} value={value} onChange={onChange} aria-invalid={Boolean(error)} aria-required='true' readOnly={isReadonly} error={Boolean(error)}>
        {options.map((option) => <MenuItem key={option.value} value={option.value}>{option.text}</MenuItem>)}
      </Select>
      {isTouched && error && <div className={styles.error}>{error}</div>}
    </FormControl>
  );
}
