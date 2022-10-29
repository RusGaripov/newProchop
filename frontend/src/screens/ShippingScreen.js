import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
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
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type='address'
                    placeholder='Enter address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                    type='city'
                    placeholder='Enter city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='postalCode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                    type='postalCode'
                    placeholder='Enter postalCode'
                    value={postalCode}
                    onChange={(e) => setpostalCode(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                    type='country'
                    placeholder='Enter country'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>Continue</Button>
        </Form>
    </FormContainer>
    )
}

export default ShippingScreen