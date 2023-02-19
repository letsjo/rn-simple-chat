import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styled from 'styled-components'
import { Button, Image, Input } from '../components'
import { images } from '../utils/Images'
import { useState, useRef } from 'react'

import { validateEmail, removeWhitespace } from '../utils/common'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
`

const ErrorText = styled.Text`
  align-items: center;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const passwordRef = useRef();
  const _handleLoginButtonPress = () => { };

  const _handleEmailChange = (email) => {
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);
    setErrorMessage(
      validateEmail(changedEmail) ? '' : 'Please verify your email.'
    );
  };

  const _handlePasswordChange = (password) => {
    setPassword(removeWhitespace(password));
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={ { flex: 1 } }
      extraScrollHeight={ 20 }
    >
      <Container>
        <Image url={ images.logo } imageStyle={ { borderRadius: 8 } } />
        <Input
          label='Email'
          value={ email }
          onChangeText={ _handleEmailChange }
          onSubmitEditing={ () => passwordRef.current.focus() }
          placeholder='Email'
          returnKeyType='next'
        />
        <Input
          ref={ passwordRef }
          label='Password'
          value={ password }
          onChangeText={ _handlePasswordChange }
          onSubmitEditing={ () => { } }
          placeholder='Password'
          returnKeyType='done'
          isPassword
        />
        <ErrorText>{ errorMessage }</ErrorText>
        <Button title='Login' onPress={ _handleLoginButtonPress } />
        <Button title='Sign up with Email' onPress={ () => navigation.navigate('Signup') } isFilled={ false } />
      </Container>
    </KeyboardAwareScrollView>
  )
}

export default Login