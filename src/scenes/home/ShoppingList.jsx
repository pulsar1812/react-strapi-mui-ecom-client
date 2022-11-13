import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Tab, Tabs, Typography, useMediaQuery } from '@mui/material'
import axios from 'axios'

import Item from '../../components/Item'
import { setItems } from '../../state'

export default function ShoppingList() {
  const [value, setValue] = useState('all')

  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart.items)

  const isNonMobile = useMediaQuery('(min-width:600px)')

  console.log(items)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await axios.get(
          'http://localhost:1337/api/items?populate=image'
        )

        dispatch(setItems(res.data.data))
      } catch (err) {
        console.log(err)
      }
    }

    getItems()
    // eslint-disable-next-line
  }, [])

  const newArrivalsItems = items.filter(
    (item) => item.attributes.category === 'newArrivals'
  )

  const topRatedItems = items.filter(
    (item) => item.attributes.category === 'topRated'
  )

  const bestSellersItems = items.filter(
    (item) => item.attributes.category === 'bestSellers'
  )

  return (
    <Box width='80%' m='80px auto'>
      <Typography variant='h3' textAlign='center'>
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? 'block' : 'none' } }}
        sx={{
          m: '25px',
          '& .MuiTab-flexContainer': {
            flexWrap: 'wrap',
          },
        }}
      >
        <Tab value='all' label='All' />
        <Tab value='newArrivals' label='New Arrivals' />
        <Tab value='topRated' label='Top Rated' />
        <Tab value='bestSellers' label='Best Sellers' />
      </Tabs>
      <Box
        display='grid'
        gridTemplateColumns='repeat(auto-fill, 300px)'
        justifyContent='space-around'
        rowGap='20px'
        columnGap='1.33%'
        m='0 auto'
      >
        {value === 'all' &&
          items.map((item) => (
            <Item key={`${item.name}-${item.id}`} item={item} />
          ))}
        {value === 'newArrivals' &&
          newArrivalsItems.map((item) => (
            <Item key={`${item.name}-${item.id}`} item={item} />
          ))}
        {value === 'topRated' &&
          topRatedItems.map((item) => (
            <Item key={`${item.name}-${item.id}`} item={item} />
          ))}
        {value === 'bestSellers' &&
          bestSellersItems.map((item) => (
            <Item key={`${item.name}-${item.id}`} item={item} />
          ))}
      </Box>
    </Box>
  )
}
