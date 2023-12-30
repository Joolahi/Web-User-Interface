import React from 'react';
import {useState } from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../database';
import {useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoggedIn } from './context';
import SignUp from './signUp'
import '../styles/singIn.css'

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {setLoggedIn} = useContext(LoggedIn)

    const singIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            navigate("/toDo");
            setLoggedIn(true);
            console.log(userCredential);
        })
        .catch((error) => {
            console.log(error)
        })


    }

    return (
        <div className='sing-in-container'>
            <form onSubmit={singIn}>
                <h1 header>Log in</h1>
                <div className='fields'>
                    <input className='input' type="text" placeholder='Enter your email' value={email} onChange={(event) => setEmail(event.target.value)}></input>
                    <input className="input" type="password" placeholder='Enter your password' value={password} onChange={(event) => setPassword(event.target.value)}></input>
                    <button className='button' type="submit">Log in</button>
                </div>
            </form>
            <SignUp/>
        </div>
    )
}

export default SignIn;