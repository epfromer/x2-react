import {
  Custodian,
  getCustodians,
  getCustodiansLoading,
  setCustodians,
  x2Server,
} from '@klonzo/common'
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { gql, request } from 'graphql-request'
import React, { Fragment, useState } from 'react'
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
    <Fragment>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Custodians
      </Typography>
      <ColorPickerDlg
        open={colorPickerDlgOpen}
        defaultColor={pickedColor}
        onClose={(color) => handleColorChosen(color)}
      />
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
    </Fragment>
  )
}
