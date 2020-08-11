import React, {useState} from 'react';
import './LoginModal.css';

const LoginModal = props => {

    const [loginForm, setLoginForm] = useState({
        username: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Username',
                userhelp: 'At least 7 character, with one number'
            },
            value: '',
            validity: {
                isValid: false,
                shouldValidate: true,
                touched: false,
                required: true,
                minLength: 7,
                requiresNum: true,
            }
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password',
                userhelp: 'At least 7 character, with one number and one special character'
            },
            value: '',
            validity: {
                isValid: false,
                shouldValidate: true,
                touched: false,
                required: true,
                minLength: 7,
                requiresNum: true,
                requiresSpecialChar: true,
            }
        }
    });

    const [isFormValid, setIsFormValid] = useState(false)

    return (
        <div className="LoginModal__mainDiv">
            <p>Login</p>
            <form>

            </form>
            <button onClick={props.onSwitchModal}>Register</button>
        </div>
    );
}

export default LoginModal;
