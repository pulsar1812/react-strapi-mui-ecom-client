import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Button, Step, Stepper, StepLabel } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'

import { shades } from '../../theme'
import Shipping from './Shipping'
import Payment from './Payment'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const initialValues = {
  billingAddress: {
    firstName: '',
    lastName: '',
    country: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zipCode: '',
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: '',
    lastName: '',
    country: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zipCode: '',
  },
  email: '',
  phoneNumber: '',
}

const checkoutSchema = [
  // For the first step of the Stepper
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required('required'),
      lastName: yup.string().required('required'),
      country: yup.string().required('required'),
      street1: yup.string().required('required'),
      street2: yup.string(),
      city: yup.string().required('required'),
      state: yup.string(),
      zipCode: yup.string(),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when('isSameAddress', {
        is: false,
        then: yup.string().required('required'),
      }),
      lastName: yup.string().when('isSameAddress', {
        is: false,
        then: yup.string().required('required'),
      }),
      country: yup.string().when('isSameAddress', {
        is: false,
        then: yup.string().required('required'),
      }),
      street1: yup.string().when('isSameAddress', {
        is: false,
        then: yup.string().required('required'),
      }),
      street2: yup.string(),
      city: yup.string().when('isSameAddress', {
        is: false,
        then: yup.string().required('required'),
      }),
      state: yup.string(),
      zipCode: yup.string(),
    }),
  }),

  // For the second step of the Stepper
  yup.object().shape({
    email: yup.string().required('required'),
    phoneNumber: yup.string().required('required'),
  }),
]

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0)

  const cart = useSelector((state) => state.cart.cart)

  const isFirstStep = activeStep === 0
  const isSecondStep = activeStep === 1

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1)

    // Copies billing address onto shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue('shippingAddress', {
        ...values.billingAddress,
        isSameAddress: true,
      })
    }

    if (isSecondStep) {
      makePayment(values)
    }

    actions.setTouched({})
  }

  const makePayment = async (values) => {
    const stripe = await stripePromise
    const body = {
      userName: [values.firstName, values.lastName].join(' '),
      email: values.email,
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })),
    }

    const { data } = await axios.post('http://localhost:1337/api/orders', {
      headers: {
        'Content-Type': 'application/jons',
      },
      body: JSON.stringify(body),
    })

    const session = data.data

    await stripe.redirectToCheckout({
      sessionId: session.id,
    })
  }

  return (
    <Box width='80%' m='100px auto'>
      <Stepper activeStep={activeStep} sx={{ m: '20px 0' }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              <Box display='flex' justifyContent='space-between' gap='50px'>
                {!isFirstStep && (
                  <Button
                    fullWidth
                    color='primary'
                    variant='contained'
                    sx={{
                      backgroundColor: shades.primary[200],
                      color: 'white',
                      boxShadow: 'none',
                      p: '15px 40px',
                      borderRadius: 0,
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  type='submit'
                  fullWidth
                  color='primary'
                  variant='contained'
                  sx={{
                    backgroundColor: shades.primary[400],
                    color: 'white',
                    boxShadow: 'none',
                    p: '15px 40px',
                    borderRadius: 0,
                  }}
                >
                  {!isSecondStep ? 'Next' : 'Back'}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}
