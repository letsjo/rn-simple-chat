import { useContext } from 'react'
import styled from 'styled-components/native'
import { Button } from 'react-native'
import { UserContext } from '../contexts'
import { signout } from '../utils/firebase'


const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`

const Profile = () => {
  const { dispatch } = useContext(UserContext);

  const _handleLogoutButtonPress = async () => {
    try {
      await signout();
    } catch (error) {
      console.log('[Profile] logout: ', error.message);
    } finally {
      dispatch({});
    }
  }

  return (
    <Container>
      <Button title='logout' onPress={ _handleLogoutButtonPress } />
    </Container>
  )
}

export default Profile