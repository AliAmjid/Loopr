import React from 'react';

import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';

import { i18n, withTranslation } from 'lib/i18n';

import { FormValues, LoginProps } from './types';

const Login = ({ t, ...props }: LoginProps): JSX.Element => {
  const { register, handleSubmit } = useForm<FormValues>();

  const submitHandler = (values: FormValues): void => {
    props.onSubmit(values.email, values.password);
  };

  return (
    <div tour-id="loginForm" style={{ width: 'fit-content' }}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          {t('email')}
          :
          <input
            name="email"
            ref={register({ required: true })}
            test-id="emailInput"
          />
        </div>
        <div>
          {t('password')}
          :
          <input
            name="password"
            ref={register({ required: true })}
            test-id="passwordInput"
          />
        </div>
        <Button
          type="submit"
          test-id="submitButton"
          tour-id="button"
          color="primary"
          variant="contained"
        >
          {t('logIn')}
        </Button>
      </form>
      <Button
        tour-id="button1"
        type="button"
        onClick={(): void => {
          i18n.changeLanguage(i18n.language === 'cs' ? 'en' : 'cs');
        }}
      >
        {t('common:changeLanguage')}
      </Button>
    </div>
  );
};

export default withTranslation('login')(Login);
