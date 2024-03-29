import { Box } from '@mui/system'
import CustodianSettings from '../components/CustodianSettings'
import ImportLog from '../components/ImportLog'

export default function AppSettingsView() {
  return (
    <Box sx={{ my: 2 }}>
      <CustodianSettings />
      <ImportLog />
    </Box>
  )
}
