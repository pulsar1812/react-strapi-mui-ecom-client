import { Box, TextField, Typography } from '@mui/material'

export default function Payment({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}) {
  return (
    <Box m='30px 0'>
      {/* Contact Info */}
      <Box>
        <Typography sx={{ mb: '15px' }} fontSize='18px'>
          Contact Info
        </Typography>
        <TextField
          fullWidth
          type='text'
          name='email'
          value={values.email}
          label='Email'
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          onBlur={handleBlur}
          onChange={handleChange}
          sx={{ gridColumn: 'span 4', mb: '15px' }}
        />
        <TextField
          fullWidth
          type='text'
          name='phoneNumber'
          value={values.phoneNumber}
          label='Phone Number'
          error={!!touched.phoneNumber && !!errors.phoneNumber}
          helperText={touched.phoneNumber && errors.phoneNumber}
          onBlur={handleBlur}
          onChange={handleChange}
          sx={{ gridColumn: 'span 4' }}
        />
      </Box>
    </Box>
  )
}
