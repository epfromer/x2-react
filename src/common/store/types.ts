export interface Email {
  id: string
  sent: Date | string
  sentShort: string
  from: string
  fromCustodian?: string
  to: string
  toCustodians?: string[]
  cc: string
  bcc: string
  subject: string
  body: string
}

export interface EmailSentByDay {
  sent: Date | string
  total: number
}

export interface CustodianInteractions {
  custodianId: string
  total: number
}

export interface Custodian {
  id: string
  name: string
  title: string
  color: string
  senderTotal: number
  receiverTotal: number
  toCustodians: CustodianInteractions[]
}

export interface WordCloudTag {
  tag: string
  weight: number
}

export interface EmailList {
  total: number
  emails: Array<Email>
}

export interface EmailSentDatum {
  id: string
  color: string
  emailTotal: number
}

export interface EmailXferedDatum {
  name: string // name of sender/receiver
  value: number // number of emails sent/received
  color: string // color of custodian
}

export interface EChartsDatum {
  value: number
  name: string
  itemStyle: any
}

export interface SearchHistoryEntry {
  id: string
  timestamp: string
  entry: string
}
