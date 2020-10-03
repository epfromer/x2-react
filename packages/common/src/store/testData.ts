import {
  Custodian,
  Email,
  EmailSentByDay,
  SearchHistoryEntry,
  WordCloudTag,
} from './types'

export const testWordCloud: Array<WordCloudTag> = [
  {
    tag: 'avici',
    weight: 32,
  },
  {
    tag: 'azurix',
    weight: 523,
  },
  {
    tag: 'backbone',
    weight: 150,
  },
  {
    tag: 'braveheart',
    weight: 29,
  },
]

export const testCustodians: Array<Custodian> = [
  {
    id: 'fastow',
    name: 'Fastow, Andrew',
    title: 'Chief Financial Officer',
    color: '#e91e63',
    senderTotal: 5,
    receiverTotal: 34,
    toCustodians: [{ custodianId: 'lay', total: 1 }],
  },
  {
    id: 'lay',
    name: 'Lay, Kenneth',
    title: 'Founder, CEO and Chairman',
    color: '#ffff00',
    senderTotal: 40,
    receiverTotal: 2690,
    toCustodians: [{ custodianId: 'fastow', total: 1 }],
  },
]

export const testEmailSentByDay: Array<EmailSentByDay> = [
  { sent: '1999-01-06', total: 1 },
  { sent: '1999-01-07', total: 2 },
  { sent: '1999-01-08', total: 3 },
]

export const testEmail: Array<Email> = [
  {
    id: '692fbb3b-1a4d-4c5b-b8c2-42034586cc56',
    sent: '2001-08-02T02:25:58.000Z',
    sentShort: '2001-08-02',
    from: 'Skilling',
    fromCustodian: 'skilling',
    to: 'allen; Phillip K.; bay; Frank',
    toCustodians: ['lay'],
    cc: 'lay; Kenneth; patrick; Christie',
    bcc: '',
    subject: 'Please Plan to Attend',
    body: 'body 1',
  },
  {
    id: 'f3281cc4-90a9-4dcb-86bd-d705fc847985',
    sent: '2001-08-02T03:21:03.000Z',
    sentShort: '2001-08-02',
    from: 'Skilling',
    fromCustodian: 'skilling',
    to: 'skilling; Jeff; allen; phillip k.',
    toCustodians: ['skilling', 'lay'],
    subject: 'Check out this cool game!',
    cc: 'lay; Kenneth; patrick; Christie',
    bcc: '',
    body: 'body 2',
  },
  {
    id: '5cac6ca4-01e7-4de5-a1d4-806b860e104d',
    sent: '2001-10-12T20:05:56.000Z',
    sentShort: '2001-10-12',
    from: 'Fleming',
    fromCustodian: 'fleming',
    to: 'lay; Kenneth; Amy Taylor (E-mail)',
    toCustodians: ['lay'],
    cc: '',
    bcc: '',
    subject: 'Check out this cool game!',
    body: 'body 3',
  },
]

export const testSearchHistory: Array<SearchHistoryEntry> = [
  {
    id: '862ee9ba-fdd3-4f6c-83d2-c9ffc310277f',
    timestamp: '2020-10-03T13:23:54.955Z',
    entry: '{"skip":0,"limit":50,"sort":"sent","order":1,"to":"ba"}',
  },
  {
    id: 'bdf5571f-ec6a-499b-a0b9-5153a065b04f',
    timestamp: '2020-10-03T13:23:54.516Z',
    entry: '{"skip":0,"limit":50,"sort":"sent","order":1,"to":"ba"}',
  },
]
