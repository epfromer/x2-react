import {
  getCustodiansAsync,
  selectCustodians,
  selectCustodiansLoading,
  Custodian,
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
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ColorPickerDlg from './ColorPickerDlg'

export default function CustodianSettings() {
  const [openColorPicker, setOpenColorPicker] = useState(false)
  const [pickedColor, setPickedColor] = useState('')
  const [custodianId, setCustodianId] = useState('')
  const custodiansLoading = useSelector(selectCustodiansLoading)
  const custodians = useSelector(selectCustodians)

  function handleColorChosen(color: string) {
    setOpenColorPicker(false)
    if (!color) return
    const url = `${process.env.REACT_APP_emailServer}/custodians/${custodianId}`
    const payload = {
      method: 'PUT',
      body: JSON.stringify({ color }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }
    fetch(url, payload)
      .then(() => getCustodiansAsync())
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
              <TableCell align="left">Color</TableCell>
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
                <TableCell align="left">
                  <Button
                    onClick={() => {
                      setCustodianId(c.id)
                      setPickedColor(c.color)
                      setOpenColorPicker(true)
                    }}
                    data-testid={c.id}
                    style={{ color: c.color }}
                  >
                    {c.color}
                  </Button>
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
