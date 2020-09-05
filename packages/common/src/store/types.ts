export interface Email {
  id: string
  sent: string
  sentShort: string
  from: string
  fromCustodian: string
  to: string
  toCustodian: string
  cc: string
  bcc: string
  subject: string
  body: string
}

export interface EmailSent {
  id: string
  to: Array<string>
  sent: string
}

export interface EmailSentStat {
  id: string
  color: string
  emailTotal: number
}

export interface EmailReceived {
  id: string
  from: string
  sent: string
}

export interface Custodian {
  id: string
  senderTotal: number
  receiverTotal: number
  toCustodians: Array<EmailSent>
  fromCustodians: Array<EmailReceived>
  name: string
  title: string
  color: string
  aliases: Array<string>
}

export interface WordCloudTag {
  id: string
  tag: string
  weight: number
}

export interface EmailSentByDay {
  id: string
  sent: string
  ids: Array<string>
}

export interface EmailList {
  total: number
  emails: Array<Email>
}

export interface EmailXferedDatum {
  name: string // name of sender/receiver
  value: number // number of emails sent/received
  color: string // color of custodian
}

export interface TotalEmailSentDatum {
  sent: string // send date
  value: number // number of emails sent
}

export interface EChartsDatum {
  value: number
  name: string
  itemStyle: any
}
