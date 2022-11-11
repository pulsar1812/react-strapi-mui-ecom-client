import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'

import { shades } from '../theme'
import { addToCart } from '../state'

export default function Item({ item, width }) {
  const [count, setCount] = useState(1)
  const [isHovered, setIsHovered] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    palette: { neutral },
  } = useTheme()

  const { category, price, name, image } = item.attributes
  const { url } = image.data.attributes.formats.medium

  return (
    <Box width={width}>
      <Box
        position='relative'
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          src={`http://localhost:1337${url}`}
          alt={item.name}
          width='300px'
          height='400px'
          onClick={() => navigate(`/item/${item.id}`)}
          style={{ cursor: 'pointer' }}
        />
        <Box
          display={isHovered ? 'block' : 'none'}
          position='absolute'
          width='100%'
          bottom='10%'
          left='0'
          p='0 5%'
        >
          <Box display='flex' justifyContent='space-between'>
            {/* Amount */}
            <Box
              display='flex'
              alignItems='center'
              backgroundColor={shades.neutral[100]}
              borderRadius='3px'
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <Remove />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <Add />
              </IconButton>
            </Box>

            {/* Button */}
            <Button
              onClick={() => {
                dispatch(addToCart({ item: { ...item, count } }))
              }}
              sx={{ backgroundColor: shades.primary[300], color: 'white' }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt='3px'>
        <Typography variant='subtitle2' color={neutral.dark}>
          {category
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase())}
        </Typography>
        <Typography>{name}</Typography>
        <Typography fontWeight='bold'>{price}</Typography>
      </Box>
    </Box>
  )
}
