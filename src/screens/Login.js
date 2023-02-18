import { Text, Button } from 'react-native'
import styled from 'styled-components'
import { Image } from '../components'
import { images } from '../utils/Images'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`

const Login = ({ navigation }) => {
  return (
    <Container>
      <Image url={ images.logo } imageStyle={ { borderRadius: 8 } } />
      <Button title='Signup' onPress={ () => navigation.navigate('Signup') } />
    </Container>
  )
}

export default Login