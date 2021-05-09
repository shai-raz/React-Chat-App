import '../css/bootstrap.min.css'
import Login from './Login';
import SignUp from './SignUp';
import { useState } from 'react';

const LoginPage = () => {
    const [login, setLogin] = useState(true)

    const switchLoginSignup = () => {
        setLogin(!login)
    }

    return (
        <>
            { (login) ? <Login switchLogin={switchLoginSignup.bind(this)} /> : <SignUp switchLogin={switchLoginSignup.bind(this)} />}
        </>
    )
}

export default LoginPage