import React from 'react'
import { Text } from 'react-native'
import styled from 'styled-components'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
`

const Login = () => {
  return (
    <Container>
      <Text style={ { fontSize: 30 } }>Login Screen</Text>
      <Button title='Signup' onPress={ () => navigation.navigate('Signup') } />
    </Container>
  )
}

export default Login