import { Alert, AlertTitle, Box } from '@mui/material'

export default function Confirmation() {
  return (
    <Box m='90px auto' width='80%' height='50vh'>
      <Alert severity='success'>
        <AlertTitle>Success</AlertTitle>
        You have successfully made an order -{' '}
        <strong>Thank you for your purchase</strong>
      </Alert>
    </Box>
  )
}
