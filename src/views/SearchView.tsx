import {
  Body,
  Button,
  Form,
  Header,
  Icon,
  Input,
  Item,
  Label,
  Left,
  Right,
  Spinner,
  Title,
} from 'native-base'
import React, { useState } from 'react'
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native'
import Modal from 'react-native-modal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/types'
import { fetchAndCache } from './../store'
import { EMAIL_LIST_PAGE_LENGTH, MAX_FROM_LENGTH } from './../store/constants'
import { Col, Row, Grid } from 'react-native-easy-grid'

// TODO - VirtualizedList: You have a large list that is slow to update - make sure your renderItem function renders components that follow React performance best practices like PureComponent, shouldComponentUpdate, etc. {"contentLength": 3030, "dt": 1195, "prevDt": 5812}

interface Props {
  route: any
  navigation: any
}
export default function SearchView({ route, navigation }: Props) {
  const dispatch = useDispatch()
  const allText = useSelector((state: RootState) => state.allText)
  const [dlgOpen, setDlgOpen] = useState(route.params.openDialog)
  const emails = useSelector((state: RootState) => state.emails)
  const totalEmails = useSelector((state: RootState) => state.totalEmails)
  const emailListPage = useSelector((state: RootState) => state.emailListPage)
  const emailsLoading = useSelector((state: RootState) => state.emailsLoading)
  const themePrimaryColor = useSelector(
    (state: RootState) => state.themePrimaryColor
  )

  function AppHeader() {
    return (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.openDrawer()}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Search</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => setDlgOpen(true)}>
            <Icon name="search" />
          </Button>
        </Right>
      </Header>
    )
  }

  function SearchDlg() {
    // https://www.npmjs.com/package/react-native-modal
    // https://www.npmjs.com/package/react-native-easy-grid

    let newAllText: string | undefined
    let sent: string | undefined
    let from: string | undefined
    let to: string | undefined
    let subject: string | undefined

    function doQuery() {
      if (newAllText !== undefined) {
        dispatch({
          type: 'setReduxState',
          key: 'allText',
          value: newAllText,
        })
        fetchAndCache('emails')
      }
      setDlgOpen(false)
    }

    return (
      <Modal
        isVisible={dlgOpen}
        backdropOpacity={0.95}
        backdropColor="white"
        supportedOrientations={['portrait', 'landscape']}
      >
        <ScrollView>
          <Form>
            <Item floatingLabel>
              <Label>Filter (all text fields)</Label>
              <Input
                onChangeText={(text) => (newAllText = text)}
                value={allText}
              />
            </Item>
            <Item floatingLabel>
              <Label>Filter Sent</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Filter From</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Filter To</Label>
              <Input onChangeText={(text) => console.log(text)} />
            </Item>
            <Item floatingLabel>
              <Label>Filter Subject</Label>
              <Input />
            </Item>
            <Grid>
              <Col>
                <Button
                  block
                  small
                  style={styles.button}
                  onPress={() => setDlgOpen(false)}
                >
                  <Text>Cancel</Text>
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  small
                  style={styles.button}
                  onPress={() => doQuery()}
                >
                  <Text>Search</Text>
                </Button>
              </Col>
            </Grid>
          </Form>
        </ScrollView>
      </Modal>
    )
  }

  const maxString = (s: string, maxLen: number): string => {
    if (s.length > maxLen) {
      return s.substring(0, maxLen - 1) + '...'
    } else {
      return s
    }
  }

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('EmailDetail', { id: item._id })}
    >
      <View style={styles.itemContainer}>
        <View style={styles.itemTopRow}>
          <View>
            <Text numberOfLines={1} style={styles.emailFromText}>
              {maxString(item.from, MAX_FROM_LENGTH)}
            </Text>
          </View>
          <View>
            <Text numberOfLines={1}>{item.sent.substring(0, 10)}</Text>
          </View>
        </View>
        <View style={styles.emailSubject}>
          <Text numberOfLines={1}>{item.subject}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  const hasMore = () =>
    (emailListPage + 1) * EMAIL_LIST_PAGE_LENGTH < totalEmails

  const handleLoadMore = () => {
    if (hasMore()) {
      dispatch({
        type: 'setReduxState',
        key: 'emailListPage',
        value: emailListPage + 1,
      })
      fetchAndCache('emails', false, true)
    }
  }

  return (
    <>
      <AppHeader />
      <SafeAreaView style={styles.container}>
        <SearchDlg />
        {emailsLoading && (
          <View style={styles.loading}>
            <Spinner color={themePrimaryColor} />
          </View>
        )}
        {emails && (
          <FlatList
            data={emails}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            initialNumToRender={EMAIL_LIST_PAGE_LENGTH}
          />
        )}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dlgContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  button: {
    margin: 15,
  },
  itemContainer: {
    margin: 5,
  },
  itemTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emailFromText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  emailSubject: {
    width: '100%',
  },
  title: {
    fontSize: 15,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
