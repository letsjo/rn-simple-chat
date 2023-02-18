import { Text, Button } from 'react-native'
import styled from 'styled-components'
import { Image, Input } from '../components'
import { images } from '../utils/Images'
import { useState, useRef } from 'react'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
`

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordRef = useRef();

  return (
    <Container>
      <Image url={ images.logo } imageStyle={ { borderRadius: 8 } } />
      <Input
        label='Email'
        value={ email }
        onChangeText={ (text) => setEmail(text) }
        onSubmitEditing={ () => passwordRef.current.focus() }
        placeholder='Email'
        returnKeyType='next'
      />
      <Input
        ref={ passwordRef }
        label='Password'
        value={ password }
        onChangeText={ (text) => setPassword(text) }
        onSubmitEditing={ () => { } }
        placeholder='Password'
        returnKeyType='done'
        isPassword
      />
    </Container>
  )
}

export default Login