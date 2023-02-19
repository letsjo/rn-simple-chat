import { useContext, useState } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Button, Input, Image } from '../components'
import { UserContext, ProgressContext } from '../contexts'
import { signout, getCurrentUser, updateUserInfo } from '../utils/firebase'
import { Alert } from 'react-native'


const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`

const Profile = () => {
  const { dispatch } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);
  const theme = useContext(ThemeContext);

  const user = getCurrentUser();
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);

  const _handleLogoutButtonPress = async () => {
    try {
      spinner.start();
      await signout();
    } catch (error) {
      console.log('[Profile] logout: ', error.message);
    } finally {
      dispatch({});
      spinner.stop();
    }
  }

  const _handlePhotoChange = async (url) => {
    try {
      spinner.start();
      const updatedUser = await updateUserInfo(url);
      setPhotoUrl(updatedUser.photoUrl);
    } catch (error) {
      Alert.alert('Photo Error', error.message);
    } finally {
      spinner.stop();
    }
  }

  return (
    <Container>
      <Image
        url={ photoUrl }
        onChangeImage={ _handlePhotoChange }
        showButton
        rounded
      />
      <Input label='Name' value={ user.name } disabled />
      <Input label='Email' value={ user.email } disabled />
      <Button
        title='logout'
        onPress={ _handleLogoutButtonPress }
        containerStyle={ { marginTop: 30, backgroundColor: theme.buttonLogout } }
      />
    </Container>
  )
}

export default Profile