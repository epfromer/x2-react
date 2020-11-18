import { Email } from '@klonzo/common'
import Collapse from '@material-ui/core/Collapse'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import React from 'react'
import { useHistory } from 'react-router-dom'
import ExpandMoreButton from './ExpandMore'

const EXPANDED_BODY_LENGTH = 1000

interface Props {
  email: Email
  lastRowRef?: any
}
export default function ExpandingRow({ email, lastRowRef }: Props) {
  const [open, setOpen] = React.useState(false)
  const history = useHistory()

  interface CellProps {
    field: string
    id: string
  }
  const LinkedTableCell: React.FC<CellProps> = ({ field, id }) => (
    <TableCell onClick={() => history.push(`/EmailDetailView/${id}`)}>
      {field}
    </TableCell>
  )
  return (
    <>
      <TableRow ref={lastRowRef} hover>
        <TableCell
          onClick={() => setOpen(!open)}
          data-testid={`expand-more-${email.id}`}
        >
          <ExpandMoreButton />
        </TableCell>
        <LinkedTableCell field={email.sentShort} id={email.id} />
        <LinkedTableCell field={email.from} id={email.id} />
        <LinkedTableCell field={email.to} id={email.id} />
        <LinkedTableCell field={email.subject} id={email.id} />
      </TableRow>
      <TableRow>
        <TableCell colSpan={5} style={{ padding: 0 }}>
          <Collapse in={open}>
            {email.body.slice(0, EXPANDED_BODY_LENGTH)}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
