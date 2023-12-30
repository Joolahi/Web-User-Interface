import React from 'react';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../database';
import '../styles/singIn.css'

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
            })
            .catch((error) => {
                console.log(error)
            })

    }

    return (
        <div className='sing-in-container'>
            <form onSubmit={signUp}>
                <h1 className='header'>Create Account</h1>
                <div className='fields'>
                    <input className='input' type="text" placeholder='Enter your email' value={email} onChange={(event) => setEmail(event.target.value)}></input>
                    <input className='input' type="password" placeholder='Enter your password' value={password} onChange={(event) => setPassword(event.target.value)}></input>
                    <button className='button' type="submit">Sing Up</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp;