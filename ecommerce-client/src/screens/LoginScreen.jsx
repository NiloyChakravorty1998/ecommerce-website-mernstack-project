import  { useState, useEffect } from 'react'
import FormContainer from '../components/FormContainer';
import { Button, Col, Form, Row } from 'react-bootstrap';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'; 
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentUserState } from '../../store/atoms/userAtom';
import { BASE_URL } from '../config';
import axios from 'axios';
import { userInfoSelector } from '../../store/selectors/userInfoSelector';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState('');
    const [userState, setUserState] = useRecoilState(currentUserState);
    const userInfo = useRecoilValue(userInfoSelector);
    const navigate = useNavigate();

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if(userInfo && userInfo !==null)
        {
            navigate(redirect);
        }
    },[redirect,userInfo,navigate])

    const submitHandler = async (e) => {
        e.preventDefault();
    
        try {
          const { data } = await axios.post(`${BASE_URL}/users/auth`, {
            email: email,
            password: password
          });
          
          // Rest of your code...
        } catch (err) {
          setError(err.response.data.message || 'An error occurred');
        }
      };
       
    return (
        <FormContainer>
            <h1>Sign In</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='Password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='mt-2' disabled={loading}>
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                New Customer?<Link to={redirect ? 
                    `/register?redirect=${redirect}` : 
                    '/register' }>Register</Link> 
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
