import {
  Custodian,
  selectCustodians,
  selectCustodiansLoading,
  setCustodians,
  x2Server,
} from '@klonzo/common'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
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

export default function CustodianSettings() {
  const dispatch = useDispatch()
  const [openColorPicker, setOpenColorPicker] = useState(false)
  const [pickedColor, setPickedColor] = useState('')
  const [custodianId, setCustodianId] = useState('')
  const custodiansLoading = useSelector(selectCustodiansLoading)
  const custodians = useSelector(selectCustodians)

  function handleColorChosen(color: string) {
    setOpenColorPicker(false)
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
      .catch((error) => console.error('CustodianSettings', error))
  }

  return (
    <>
      <ColorPickerDlg
        open={openColorPicker}
        defaultColor={pickedColor}
        onClose={(color) => handleColorChosen(color)}
      />
      {custodiansLoading && <LinearProgress />}
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
            {custodians?.map((c: Custodian) => (
              <TableRow key={c.name}>
                <TableCell component="th" scope="row">
                  {c.name}
                </TableCell>
                <TableCell>{c.title}</TableCell>
                <TableCell align="right">{c.senderTotal}</TableCell>
                <TableCell align="right">{c.receiverTotal}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => {
                      setCustodianId(c.id)
                      setPickedColor(c.color)
                      setOpenColorPicker(true)
                    }}
                    data-testid={c.id}
                    style={{ backgroundColor: c.color }}
                  ></Button>
                </TableCell>
              </TableRow>
            ))}
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
