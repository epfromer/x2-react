import { gql, request } from 'graphql-request'
import { defaultLimit, x2Server } from '../constants'
import {
  appendEmail,
  setEmail,
  setEmailLoading,
  setEmailTotal,
  store,
} from './index'

function makeQueryObj(): any {
  const state = store.getState()
  const query: any = {
    skip: state.query.emailListPage * defaultLimit,
    limit: defaultLimit,
    sort: state.query.querySort,
    order: state.query.queryOrder,
  }
  if (state.query.sent) query.sent = state.query.sent
  if (state.query.timeSpan) query.timeSpan = state.query.timeSpan
  if (state.query.from) query.from = state.query.from
  if (state.query.to) query.to = state.query.to
  if (state.query.subject) query.subject = state.query.subject
  if (state.query.allText) query.allText = state.query.allText
  if (state.query.body) query.body = state.query.body
  return query
}

export function getEmailAsync(append: boolean = false) {
  store.dispatch(setEmailLoading(true))
  const server = process.env.REACT_APP_X2_SERVER
    ? process.env.REACT_APP_X2_SERVER
    : x2Server
  // console.log(server)
  const query = gql`
    query getEmail(
      $skip: Int
      $limit: Int
      $sort: String
      $order: Int
      $sent: String
      $timeSpan: Int
      $from: String
      $to: String
      $subject: String
      $allText: String
      $body: String
    ) {
      getEmail(
        skip: $skip
        limit: $limit
        sort: $sort
        order: $order
        sent: $sent
        timeSpan: $timeSpan
        from: $from
        to: $to
        subject: $subject
        allText: $allText
        body: $body
      ) {
        emails {
          id
          sent
          sentShort
          from
          fromCustodian
          to
          toCustodians
          cc
          bcc
          subject
          body
        }
        total
      }
    }
  `
  request(`${server}/graphql/`, query, makeQueryObj())
    .then((data) => {
      if (append) {
        store.dispatch(appendEmail(data.getEmail.emails))
      } else {
        store.dispatch(setEmail(data.getEmail.emails))
      }
      store.dispatch(setEmailTotal(data.getEmail.total))
      store.dispatch(setEmailLoading(false))
    })
    .catch((err) => console.error('getEmailAsync: ', err))
}
