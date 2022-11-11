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
import { setIsCartOpen } from '../../state'

export default function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart)

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
        <Box
          display='flex'
          justifyContent='space-between'
          columnGap='20px'
          zIndex='2'
        >
          <IconButton sx={{ color: 'black' }}>
            <SearchOutlined />
          </IconButton>

          <IconButton sx={{ color: 'black' }}>
            <PersonOutline />
          </IconButton>

          <Badge
            badgeContent={cart.length}
            color='secondary'
            invisible={cart.length === 0}
            sx={{
              '& .MuiBadge-badge': {
                right: 5,
                top: 5,
                minWidth: '13px',
                height: '14px',
                p: '0 4px',
              },
            }}
          >
            <IconButton
              sx={{ color: 'black' }}
              onClick={() => dispatch(setIsCartOpen())}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>

          <IconButton sx={{ color: 'black' }}>
            <MenuOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}
