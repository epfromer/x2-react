import { setThemeNameAsync, store } from '@klonzo/common'
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import React from 'react'
import { AppTheme, appThemes } from '../utils/appThemes'

export default function ThemePicker() {
  const renderTheme = (t: AppTheme) => (
    <TableRow key={t.name}>
      <TableCell align="center">
        <Button
          variant="contained"
          onClick={() => setThemeNameAsync(store, t.name)}
          data-testid={t.name}
          style={{ backgroundColor: t.primary.main, height: 30 }}
        ></Button>
      </TableCell>
    </TableRow>
  )

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="custodians">
          <TableHead>
            <TableRow>
              <TableCell align="center">Color</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{appThemes?.map((t) => renderTheme(t))}</TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
