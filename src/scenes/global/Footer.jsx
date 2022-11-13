import { Box, Typography, useTheme } from '@mui/material'

import { shades } from '../../theme'

export default function Footer() {
  const {
    palette: { neutral },
  } = useTheme()

  return (
    <Box backgroundColor={neutral.light} p='40px 0' mt='70px'>
      <Box
        display='flex'
        justifyContent='space-between'
        flexWrap='wrap'
        rowGap='30px'
        columnGap='clamp(20px, 30px, 40px)'
        width='80%'
        m='auto'
      >
        <Box width='clamp(20%, 30%, 40%)'>
          <Typography
            variant='h4'
            fontWeight='bold'
            color={shades.secondary[500]}
            mb='30px'
          >
            VALUE HUNTER
          </Typography>
          <div>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro
            dicta necessitatibus facere numquam temporibus alias placeat rerum
            debitis voluptas delectus vitae, quidem eaque autem at.
          </div>
        </Box>

        <Box>
          <Typography variant='h4' fontWeight='bold' mb='30px'>
            About Us
          </Typography>
          <Typography mb='30px'>Careers</Typography>
          <Typography mb='30px'>Our Stores</Typography>
          <Typography mb='30px'>Terms & Conditions</Typography>
          <Typography mb='30px'>Privacy Policy</Typography>
        </Box>

        <Box>
          <Typography variant='h4' fontWeight='bold' mb='30px'>
            Customer Care
          </Typography>
          <Typography mb='30px'>Help Center</Typography>
          <Typography mb='30px'>Track Your Order</Typography>
          <Typography mb='30px'>Corporate & Bulk Purchasing</Typography>
          <Typography mb='30px'>Return & Refund</Typography>
        </Box>

        <Box width='clamp(20%, 25%, 30%)'>
          <Typography variant='h4' fontWeight='bold' mb='30px'>
            Contact Us
          </Typography>
          <Typography mb='30px'>1001 Nathan St. Kowloon Hong Kong</Typography>
          <Typography mb='30px' sx={{ wordWrap: 'break-word' }}>
            Email: cs@valuehuntergroup.com
          </Typography>
          <Typography mb='30px'>(852) 98765432</Typography>
        </Box>
      </Box>
    </Box>
  )
}
