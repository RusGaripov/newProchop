import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUser } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { USER_UPDATE_RESET } from '../constants/userConstants'


const UserEditScreen = () => {
    const params = useParams();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)


    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)

    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)


    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate
    } = userUpdate

    const navigate = useNavigate()

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/userlist')

        } else {
            if (!user.name || user._id !== params.id) {
                dispatch(getUserDetails(params.id))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, params.id, user, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(params.id,name,email,isAdmin)
        dispatch(updateUser({ _id: params.id, name , email, isAdmin }))
    }

    return (
        <>
            <Link to='admin/userlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                    (<Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email' style={{ 'marginTop': '20px' }}>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='isadmin' style={{ 'marginTop': '20px' }}>
                            <Form.Check
                                type='checkbox'
                                label='Is Admin'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}>
                            </Form.Check>
                        </Form.Group>
                        <div style={{ 'marginTop': '20px' }}>
                            <Button type='submit' variant='primary' onClick={submitHandler}>
                                Update
                            </Button>
                        </div>
                    </Form>
                    )
                }
            </FormContainer>
        </>
    )
}

export default UserEditScreen
