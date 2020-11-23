import {
  Custodian,
  getCustodians,
  getCustodiansLoading,
  setCustodians,
  x2Server,
} from '@klonzo/common'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { gql, request } from 'graphql-request'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ColorPickerDlg from './ColorPickerDlg'
import LoadingIndicator from './LoadingIndicator'

export default function CustodianSettings() {
  const dispatch = useDispatch()
  const [colorPickerDlgOpen, setColorPickerDlgOpen] = useState(false)
  const [pickedColor, setPickedColor] = useState('')
  const [custodianId, setCustodianId] = useState('')
  const custodiansLoading = useSelector(getCustodiansLoading)
  const custodians = useSelector(getCustodians)

  const handleColorChosen = (color: string) => {
    setColorPickerDlgOpen(false)
    if (!color) return
    const server = process.env.REACT_APP_X2_SERVER
      ? process.env.REACT_APP_X2_SERVER
      : x2Server
    const mutation = gql`
      mutation setCustodianColor($id: ID, $color: String) {
        setCustodianColor(id: $id, color: $color) {
          id
          name
          title
          color
          senderTotal
          receiverTotal
          toCustodians {
            custodianId
            total
          }
        }
      }
    `
    request(`${server}/graphql/`, mutation, { id: custodianId, color })
      .then((data) => dispatch(setCustodians(data.setCustodianColor)))
      .catch((e) => console.error(e))
  }

  const renderCustodian = (custodian: Custodian) => (
    <TableRow key={custodian.name}>
      <TableCell>{custodian.name}</TableCell>
      <TableCell>{custodian.title}</TableCell>
      <TableCell align="right">{custodian.senderTotal}</TableCell>
      <TableCell align="right">{custodian.receiverTotal}</TableCell>
      <TableCell align="center">
        <Button
          variant="contained"
          onClick={() => {
            setCustodianId(custodian.id)
            setPickedColor(custodian.color)
            setColorPickerDlgOpen(true)
          }}
          data-testid={custodian.id}
          style={{ backgroundColor: custodian.color, height: 30 }}
        ></Button>
      </TableCell>
    </TableRow>
  )

  return (
    <>
      <ColorPickerDlg
        open={colorPickerDlgOpen}
        defaultColor={pickedColor}
        onClose={(color) => handleColorChosen(color)}
      />
      {custodiansLoading && <LoadingIndicator />}
      <TableContainer component={Paper}>
        <Table size="small" aria-label="custodians">
          <TableHead>
            <TableRow>
              <TableCell>Custodian</TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="right">Sent</TableCell>
              <TableCell align="right">Received</TableCell>
              <TableCell align="center">Color</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {custodians?.map((custodian: Custodian) =>
              renderCustodian(custodian)
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <button
        hidden
        onClick={() => handleColorChosen('red')}
        data-testid="handle-click"
      ></button>
    </>
  )
}
