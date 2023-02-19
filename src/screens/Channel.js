import { useEffect, useLayoutEffect, useState } from 'react'
import styled from 'styled-components/native'
import { Text, FlatList } from 'react-native'
import { createMessage, getCurrentUser, app } from '../utils/firebase';
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  doc,
  orderBy,
} from 'firebase/firestore';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`

const Channel = ({ navigation, route: { params } }) => {
  const [messages, setMessages] = useState([]);

  const db = getFirestore(app);
  useEffect(() => {
    const docRef = doc(db, 'channels', route.params.id);
    const collectionQuery = query(
      collection(db, `${docRef.path}/messages`),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(collectionQuery, snapshot => {
      const list = [];
      snapshot.forEach(doc => {
        list.push(doc.data());
      });
      setMessages(list);
    });
    return () => unsubscribe();
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: params.title || 'Channel',
    });
  }, [])

  return (
    <Container>
      <FlatList
        keyExtractor={ item => item['id'] }
        data={ messages }
        renderItem={ ({ item }) => (
          <Text style={ { fontSize: 24 } }>{ item.text }</Text>
        ) }
      />
    </Container>
  )
}

export default Channel