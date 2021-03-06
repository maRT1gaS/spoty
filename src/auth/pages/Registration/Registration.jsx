import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AuthContainer from '../../components/AuthContainer/AuthContainer';
import AuthTitle from '../../components/AuthTitle/AuthTitle';
import {
  Input,
  Button,
  Form,
  Logo,
  CustomLink,
} from '../../../components/index';

import EmailIcon from '../../../assets/svg/email.svg';
import PasswordIcon from '../../../assets/svg/padlock.svg';
import UserIcon from '../../../assets/svg/user.svg';

import styles from './Registration.module.css';

import { registrationAction } from '../../../redux/actions/registrationAction';

const Registration = ({ isAuth, onRegistartion, typeNotification }) => {
  const history = useHistory();
  const [nameInp, setNameInp] = useState('');
  const [emailInp, setEmailInp] = useState('');
  const [passwordInp, setPasswordInp] = useState('');
  const [copyPasswordInp, setCopyPasswordInp] = useState('');

  const handleNameInp = (e) => setNameInp(e.target.value);

  const handleEmailInp = (e) => setEmailInp(e.target.value);

  const handlePasswordInp = (e) => setPasswordInp(e.target.value);

  const handleCopyPasswordInp = (e) => setCopyPasswordInp(e.target.value);

  const handleAuthorization = (e) => {
    e.preventDefault();

    const userData = {
      name: nameInp,
      email: emailInp,
      password: passwordInp,
      copypassword: copyPasswordInp,
    };

    onRegistartion(userData);
  };

  useEffect(() => {
    if (typeNotification === 'success') {
      setPasswordInp('');
      setEmailInp('');
      setCopyPasswordInp('');
      setNameInp('');
      history.push('/login');
    }
  }, [history, typeNotification]);

  useEffect(() => {
    if (!isAuth) {
      const firstInput = document.getElementById('name');
      firstInput.focus();
    }
  }, [isAuth]);

  if (isAuth) {
    return <Redirect push to='/' />;
  }

  return (
    <>
      <Helmet>
        <title>??????????????????????</title>
      </Helmet>
      <div className='flex justify-content-c align-items-c flex-direction-col fullscreen'>
        <Logo />
        <AuthContainer>
          <AuthTitle>??????????????????????</AuthTitle>
          <Form legend='??????????????????????' onSubmit={handleAuthorization} role='form'>
            <div className={styles.formContent}>
              <div className={styles.formInputs}>
                <Input
                  value={nameInp}
                  onChange={handleNameInp}
                  placeholder='?????????????? ??????e ??????*'
                  type='text'
                  id='name'
                  label='?????????????? ???????? ??????'
                  preIcon={<UserIcon />}
                />

                <Input
                  value={emailInp}
                  onChange={handleEmailInp}
                  placeholder='?????????????? ?????? email*'
                  type='email'
                  id='email'
                  label='?????????????? ?????? email'
                  preIcon={<EmailIcon />}
                />

                <Input
                  value={passwordInp}
                  onChange={handlePasswordInp}
                  placeholder='?????????????? ?????? ????????????*'
                  type='password'
                  id='password'
                  label='?????????????? ?????? ????????????'
                  preIcon={<PasswordIcon />}
                />

                <Input
                  value={copyPasswordInp}
                  onChange={handleCopyPasswordInp}
                  placeholder='?????????????????? ?????? ????????????*'
                  type='password'
                  id='passwordcopy'
                  label='?????????????????? ?????? ????????????'
                  preIcon={<PasswordIcon />}
                />
              </div>
              <Button type='submit'>????????????????????????????????????</Button>
            </div>
          </Form>
          <CustomLink path='/login'>?????? ???????? ???????????????</CustomLink>
        </AuthContainer>
      </div>
    </>
  );
};

Registration.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  onRegistartion: PropTypes.func.isRequired,
  typeNotification: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.authorization.isAuth,
  typeNotification: state.notification.typeNotification,
});

const mapDispatchToProps = {
  onRegistartion: (userData) => registrationAction(userData),
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
