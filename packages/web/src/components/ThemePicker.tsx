import { selectThemeName, setThemeNameAsync } from '@klonzo/common'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import CheckIcon from '@material-ui/icons/Check'
import React from 'react'
import { useSelector } from 'react-redux'
import { AppTheme, appThemes } from '../utils/appThemes'

export default function ThemePicker() {
  const themeName = useSelector(selectThemeName)

  const renderTheme = (t: AppTheme) => (
    <TableRow key={t.name}>
      <TableCell component="th" scope="row">
        {t.name}
      </TableCell>
      <TableCell align="center">
        {t.name === themeName ? (
          <Button
            variant="contained"
            startIcon={<CheckIcon />}
            data-testid={t.name}
            style={{ backgroundColor: t.primary.main, height: 30 }}
          ></Button>
        ) : (
            <Button
              variant="contained"
              onClick={() => setThemeNameAsync(t.name)}
              data-testid={t.name}
              style={{ backgroundColor: t.primary.main, height: 30 }}
            ></Button>
          )}
      </TableCell>
    </TableRow>
  )

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="custodians">
          <TableHead>
            <TableRow>
              <TableCell>Theme</TableCell>
              <TableCell align="center">Color</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{appThemes?.map((t) => renderTheme(t))}</TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
