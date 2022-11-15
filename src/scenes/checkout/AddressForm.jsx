import { Box, TextField, useMediaQuery } from '@mui/material'
import { getIn } from 'formik'

export default function AddressForm({
  type,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}) {
  const isNonMobile = useMediaQuery('(min-width:600px)')

  const formattedName = (field) => `${type}.${field}`

  const formattedError = (field) =>
    Boolean(
      getIn(touched, formattedName(field)) &&
        getIn(errors, formattedName(field))
    )

  const formattedHelper = (field) =>
    getIn(touched, formattedName(field)) && getIn(errors, formattedName(field))

  return (
    <Box
      display='grid'
      gap='15px'
      gridTemplateColumns='repeat(4, minmax(0, 1fr))'
      sx={{
        '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
      }}
    >
      <TextField
        fullWidth
        type='text'
        name={formattedName('firstName')}
        value={values.firstName}
        label='First Name'
        error={formattedError('firstName')}
        helperText={formattedHelper('firstName')}
        onBlur={handleBlur}
        onChange={handleChange}
        sx={{ gridColumn: 'span 2' }}
      />
      <TextField
        fullWidth
        type='text'
        name={formattedName('lastName')}
        value={values.lastName}
        label='Last Name'
        error={formattedError('lastName')}
        helperText={formattedHelper('lastName')}
        onBlur={handleBlur}
        onChange={handleChange}
        sx={{ gridColumn: 'span 2' }}
      />
      <TextField
        fullWidth
        type='text'
        name={formattedName('country')}
        value={values.country}
        label='Country'
        error={formattedError('country')}
        helperText={formattedHelper('country')}
        onBlur={handleBlur}
        onChange={handleChange}
        sx={{ gridColumn: 'span 4' }}
      />
      <TextField
        fullWidth
        type='text'
        name={formattedName('street1')}
        value={values.street1}
        label='Street Address 1'
        error={formattedError('street1')}
        helperText={formattedHelper('street1')}
        onBlur={handleBlur}
        onChange={handleChange}
        sx={{ gridColumn: 'span 2' }}
      />
      <TextField
        fullWidth
        type='text'
        name={formattedName('street2')}
        value={values.street2}
        label='Street Address 2 (optional)'
        error={formattedError('street2')}
        helperText={formattedHelper('street2')}
        onBlur={handleBlur}
        onChange={handleChange}
        sx={{ gridColumn: 'span 2' }}
      />
      <TextField
        fullWidth
        type='text'
        name={formattedName('city')}
        value={values.city}
        label='City'
        error={formattedError('city')}
        helperText={formattedHelper('city')}
        onBlur={handleBlur}
        onChange={handleChange}
        sx={{ gridColumn: 'span 2' }}
      />
      <TextField
        fullWidth
        type='text'
        name={formattedName('state')}
        value={values.state}
        label='State'
        error={formattedError('state')}
        helperText={formattedHelper('state')}
        onBlur={handleBlur}
        onChange={handleChange}
        sx={{ gridColumn: '1fr' }}
      />
      <TextField
        fullWidth
        type='text'
        name={formattedName('zipCode')}
        value={values.zipCode}
        label='ZIP Code'
        error={formattedError('zipCode')}
        helperText={formattedHelper('zipCode')}
        onBlur={handleBlur}
        onChange={handleChange}
        sx={{ gridColumn: '1fr' }}
      />
    </Box>
  )
}
