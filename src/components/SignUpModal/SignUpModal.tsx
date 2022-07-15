import { ChangeEvent, useEffect, useState } from 'react';
import styles from './SignUpModal.module.css';
import { MouseEvent } from 'react';
import { InputContainer } from '../InputContainer';
import { IOption, SelectContainer } from '../SelectContainer';
import { Dialog, DialogTitle, DialogContent, DialogActions, SelectChangeEvent, Button } from '@mui/material';
import InputMask from 'react-input-mask';

interface IAuthModal {
  open: boolean;
  onClose: () => void;
}

export function SignUpModal({ open, onClose }: IAuthModal) {
  const options: Array<IOption> = [
    { value: '1', text: 'Россия' },
    { value: '2', text: 'Германия' },
    { value: '3', text: 'Франция' },
    { value: '4', text: 'Норвегия' },
  ];

  const [isTouched, setIsTouched] = useState<boolean>(false);

  const [username, setUsername] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  function validateUsername() {
    if (username.length === 0) return 'Поле является обязательным';
    if (username.length < 15) return 'Введите не менее 15 символов';

    return '';
  }

  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  function validatePassword() {
    if (password.length === 0) return 'Поле является обязательным';
    if (password.length < 10) return 'Пароль должен содержать не менее 10 символов';
    if (!/^[A-Za-z0-9]*$/.test(password)) return 'Пароль должен содержать только латинские буквы и цифры';

    return '';
  }

  const [phone, setPhone] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  function validatePhone() {
    const unmaskedPhone = phone.replace('+7', '').replace(/[^\d]/g, '');
    if (unmaskedPhone.length === 0) return 'Поле является обязательным';
    if (unmaskedPhone.length !== 10) return 'Телефон заполнен не полностью';

    return '';
  }

  const [country, setCountry] = useState<string>('');
  const [countryError, setCountryError] = useState<string>('');
  function validateCountry() {
    const selectedOption = options.find((option) => option.value === country);
    const countryName = selectedOption ? selectedOption.text : '';
    if (countryName.length === 0) return 'Поле является обязательным';

    return '';
  }

  function validate() {
    const validUsername = validateUsername();
    const validPassword = validatePassword();
    const validPhone = validatePhone();
    const validCountry = validateCountry();

    setUsernameError(validUsername);
    setPasswordError(validPassword);
    setPhoneError(validPhone);
    setCountryError(validCountry);

    return !validUsername && !validPassword && !validPhone && !validCountry;
  }

  const usernameHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  }

  const passwordHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  }

  const phoneHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(event.currentTarget.value);
  }

  const countryHandleChange = (event: SelectChangeEvent<string>) => {
    setCountry(event.target.value);
  }

  const saveHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsTouched(true);

    if (validate()) {
      onClose();
      setTimeout(() => { alert('Регистрация прошла успешно') }, 300);
    }
  }

  const cancelHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClose();
  }

  useEffect(() => {
    if (open) {
      setUsername('');
      setPassword('');
      setPhone('');
      setCountry('');

      setUsernameError('');
      setPasswordError('');
      setPhoneError('');
      setCountryError('');
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{
        textAlign: 'center',
        fontWeight: 700
      }}>Регистрация</DialogTitle> 

      <DialogContent sx={{
          maxWidth: '500px'
        }}>
        <form className={styles.form}>
          <InputContainer id='usernameInputId' type='text' label='Имя пользователя *' value={username} onChange={usernameHandleChange} error={usernameError} isTouched={isTouched} />
          <InputContainer id='passwordInputId' type='password' label='Пароль *' value={password} onChange={passwordHandleChange} error={passwordError} isTouched={isTouched} />
          <InputMask
            mask="+7 (999) 999 99 99"
            value={phone}
            onChange={phoneHandleChange}
            maskChar='_'
            alwaysShowMask={true}
          >
            <InputContainer id='phoneInputId' type='tel' label='Телефон *' value={phone} error={phoneError} isTouched={isTouched} />
          </InputMask>
          <SelectContainer id='countrySelectId' label='Страна *' value={country} options={options} onChange={countryHandleChange} error={countryError} isTouched={isTouched} />

          <DialogActions sx={{
            mt: 4
          }}>
            <Button type='submit' variant='contained' onClick={saveHandleClick}>Сохранить</Button>
            <Button type='button' variant='outlined' onClick={cancelHandleClick}>Отмена</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
