export interface Email {
  id: string
  sent: Date
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
  sent: Date
  emailIds: string[]
}

export interface EmailSentByDayDatum {
  sent: Date // send date
  value: number // number of emails sent
}

export interface EmailSentToCustodians {
  emailId: string
  custodianIds: string[]
}

export interface EmailReceivedFromCustodians {
  emailId: string
  custodianId: string
}

export interface Custodian {
  id: string
  name: string
  aliases: string[]
  title: string
  color: string
  senderTotal: number
  receiverTotal: number
  toCustodians: EmailSentToCustodians[]
  fromCustodians: EmailReceivedFromCustodians[]
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
