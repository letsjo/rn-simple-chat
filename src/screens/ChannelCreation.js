import React from 'react'
import { Button, Text } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`

const ChannelCreation = ({ navigation }) => {
  return (
    <Container>
      <Text
        style={ { fontSize: 24 } }
      >ChannelCreation</Text>
      <Button
        title='Channel'
        onPress={ () => navigation.navigate('Channel') }
      ></Button>
    </Container>
  )
}

export default ChannelCreation