import { useState } from 'react'
import { Box, Divider, IconButton, InputBase, Typography } from '@mui/material'
import { MarkEmailReadOutlined } from '@mui/icons-material'

import { shades } from '../../theme'

export default function Subscribe() {
  const [email, setEmail] = useState('')

  return (
    <Box width='80%' textAlign='center' m='80px auto'>
      <IconButton>
        <MarkEmailReadOutlined fontSize='large' />
      </IconButton>
      <Typography variant='h3'>Subscribe to Our Newsletter</Typography>
      <Typography>
        and receive $20 coupon for your first order when you checkout
      </Typography>
      <Box
        display='flex'
        alignItems='center'
        width='75%'
        backgroundColor={shades.neutral[100]}
        p='2px 4px'
        m='15px auto'
      >
        <InputBase
          value={email}
          placeholder='Enter Email'
          onChange={(e) => setEmail(e.target.value)}
          sx={{ ml: 1, flex: 1 }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
        <Typography sx={{ p: '10px', ':hover': { cursor: 'pointer' } }}>
          Subscribe
        </Typography>
      </Box>
    </Box>
  )
}
