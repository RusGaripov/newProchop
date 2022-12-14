import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setpostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    let navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        navigate('/payment')
    }

    return (<FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address' className='mt-3'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type='address'
                    placeholder='Enter address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='city' className='mt-3'>
                <Form.Label>City</Form.Label>
                <Form.Control
                    type='city'
                    placeholder='Enter city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='postalCode' className='mt-3'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                    type='postalCode'
                    placeholder='Enter postalCode'
                    value={postalCode}
                    onChange={(e) => setpostalCode(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='country' className='mt-3'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                    type='country'
                    placeholder='Enter country'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-5'>Continue</Button>
        </Form>
    </FormContainer>
    )
}

export default ShippingScreen
