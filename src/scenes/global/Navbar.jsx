import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Badge, Box, IconButton } from '@mui/material'
import {
  MenuOutlined,
  PersonOutline,
  SearchOutlined,
  ShoppingBagOutlined,
} from '@mui/icons-material'

import { shades } from '../../theme'

export default function Navbar() {
  const navigate = useNavigate()
  const dipatch = useDispatch()

  return (
    <Box
      display='flex'
      alignItems='cneter'
      width='100%'
      height='60px'
      backgroundColor='rgba(255, 255, 255, 0.95'
      color='black'
      position='fixed'
      top='0'
      left='0'
      zIndex='1'
    >
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        width='80%'
        margin='auto'
      >
        <Box
          onClick={() => navigate('/')}
          sx={{ '&:hover': { cursor: 'pointer' } }}
          color={shades.secondary[500]}
        >
          ECOM
        </Box>
        <Box></Box>
      </Box>
    </Box>
  )
}
