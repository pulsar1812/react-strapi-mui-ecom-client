import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Divider, IconButton, Typography } from '@mui/material'
import { Close, Add, Remove } from '@mui/icons-material'
import styled from '@emotion/styled'

import { shades } from '../../theme'
import {
  setIsCartOpen,
  removeFromCart,
  increaseCount,
  decreaseCount,
} from '../../state'

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default function CartMenu() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart)
  const isCartOpen = useSelector((state) => state.cart.isCartOpen)

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price
  }, 0)

  return (
    <Box
      display={isCartOpen ? 'block' : 'none'}
      position='fixed'
      width='100%'
      height='100%'
      left='0'
      top='0'
      overflow='auto'
      backgroundColor='rgba(0, 0, 0, 0.4)'
      zIndex={10}
    >
      <Box
        position='fixed'
        right='0'
        bottom='0'
        width='max(400px, 30%)'
        height='100%'
        backgroundColor='white'
      >
        <Box height='100%' p='30px' overflow='auto'>
          {/* Header */}
          <FlexBox mb='15px'>
            <Typography variant='h3'>Shopping Cart ({cart.length})</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen())}>
              <Close />
            </IconButton>
          </FlexBox>

          {/* Cart List */}
          <Box>
            {cart.map((item) => (
              <Box key={`${item.attributes.name}-${item.id}`}>
                <FlexBox p='15px 0'>
                  <Box flex='1 1 40%'>
                    <img
                      src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                      alt={item?.name}
                      width='123px'
                      height='164px'
                    />
                  </Box>
                  <Box flex='1 1 60%'>
                    {/* Item Name */}
                    <FlexBox mb='5px'>
                      <Typography fontWeight='bold'>
                        {item.attributes.name}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromCart({ id: item.id }))
                        }
                      >
                        <Close />
                      </IconButton>
                    </FlexBox>

                    {/* Item Description */}
                    <Typography>{item.attributes.shortDescription}</Typography>

                    <FlexBox m='15px 0'>
                      {/* Amount */}
                      <Box
                        display='flex'
                        alignItems='center'
                        border={`1.5px solid ${shades.neutral[500]}`}
                      >
                        <IconButton
                          onClick={() =>
                            dispatch(decreaseCount({ id: item.id }))
                          }
                        >
                          <Remove />
                        </IconButton>
                        <Typography>{item.count}</Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(increaseCount({ id: item.id }))
                          }
                        >
                          <Add />
                        </IconButton>
                      </Box>

                      {/* Price */}
                      <Typography fontWeight='bold'>
                        ${item.attributes.price}
                      </Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>

                <Divider />
              </Box>
            ))}
          </Box>

          {/* Actions */}
          <Box m='20px 0'>
            <FlexBox m='20px 0'>
              <Typography fontWeight='bold'>Subtotal</Typography>
              <Typography fontWeight='bold'>${totalPrice}</Typography>
            </FlexBox>
            <Button
              sx={{
                backgroundColor: shades.primary[400],
                color: 'white',
                minWidth: '100%',
                p: '20px 40px',
                m: '20px 0',
                borderRadius: 0,
              }}
              onClick={() => {
                navigate('/checkout')
                dispatch(setIsCartOpen())
              }}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
