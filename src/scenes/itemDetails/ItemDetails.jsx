import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Box, Button, IconButton, Tab, Tabs, Typography } from '@mui/material'
import { Add, FavoriteBorderOutlined, Remove } from '@mui/icons-material'
import axios from 'axios'

import { shades } from '../../theme'
import { addToCart } from '../../state'
import Item from '../../components/Item'

export default function ItemDetails() {
  const [value, setValue] = useState('description')
  const [count, setCount] = useState(1)
  const [item, setItem] = useState(null)
  const [items, setItems] = useState([])

  const dispatch = useDispatch()
  const { itemId } = useParams()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const getItem = async () => {
    const { data } = await axios.get(
      `http://localhost:1337/api/items/${itemId}?populate=image`
    )

    setItem(data.data)
  }

  const getItems = async () => {
    const { data } = await axios.get(
      `http://localhost:1337/api/items?populate=image`
    )

    setItems(data.data)
  }

  useEffect(() => {
    getItem()
    getItems()
    // eslint-disable-next-line
  }, [itemId])

  return (
    <Box width='80%' m='80px auto'>
      <Box display='flex' flexWrap='wrap' columnGap='40px'>
        {/* Image */}
        <Box flex='1 1 40%' mb='40px'>
          <img
            src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
            alt={item?.name}
            width='100%'
            height='100%'
            style={{ objectFit: 'contain' }}
          />
        </Box>

        {/* Actions */}
        <Box flex='1 1 50%' mb='40px'>
          <Box display='flex' justifyContent='space-between'>
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box>

          <Box m='65px 0 25px 0'>
            <Typography variant='h3'>{item?.attributes?.name}</Typography>
            <Typography>${item?.attributes?.price}</Typography>
            <Typography sx={{ mt: '20px' }}>
              {item?.attributes?.longDescription}
            </Typography>
          </Box>

          {/* Count and Button */}
          <Box display='flex' alignItems='center' minHeight='50px'>
            <Box
              display='flex'
              alignItems='center'
              p='2px 5px'
              border={`1.5px solid ${shades.neutral[300]}`}
              mr='20px'
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <Remove />
              </IconButton>
              <Typography sx={{ p: '0 5px' }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <Add />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: shades.primary[400],
                ':hover': {
                  backgroundColor: shades.primary[200],
                },
                color: 'white',
                minWidth: '150px',
                p: '10px 40px',
                borderRadius: 0,
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              Add to Cart
            </Button>
          </Box>

          <Box>
            <Box display='flex' m='20px 0 5px 0'>
              <FavoriteBorderOutlined />
              <Typography sx={{ ml: '5px' }}>Add to Wishlist</Typography>
            </Box>
            <Typography>Categories: {item?.attributes?.category}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Information */}
      <Box m='20px 0'>
        <Tabs value={value} onChange={handleChange}>
          <Tab value='description' label='Description' />
          <Tab value='reviews' label='Reviews' />
        </Tabs>
      </Box>
      <Box>
        {value === 'description' && (
          <div>{item?.attributes?.longDescription}</div>
        )}
        {value === 'reviews' && <div>reviews</div>}
      </Box>

      {/* Related Items */}
      <Box width='100%' mt='50px'>
        <Typography variant='h3' fontWeight='bold'>
          Related Products
        </Typography>
        <Box
          display='flex'
          flexWrap='wrap'
          justifyContent='space-between'
          columnGap='1.33%'
          mt='20px'
        >
          {items.slice(0, 4).map((item, index) => (
            <Item key={`${item.name}-${index}`} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
