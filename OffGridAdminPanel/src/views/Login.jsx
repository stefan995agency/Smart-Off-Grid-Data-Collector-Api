import { Link } from "react-router-dom";
import {useRef, useState, } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function Login(){

    
    const emailRef = useRef();
    const passwordRef = useRef();
    
    const {setUser, setToken} = useStateContext()

    const [errors, setErrors] = useState(null);

    const onSubmit = (ev) => {
        ev.preventDefault()

        const payload = {
            
            email: emailRef.current.value,
            password: passwordRef.current.value,
           
        } 
        axiosClient.post('/login', payload)
        .then(({data})=> {
            setUser(data.user)
            setToken(data.token)

        })
        .catch(error => {
            const response = error.response;
            if(response && response.status === 422){
                console.log(response.data.error);
                setErrors(response.data.errors);
            }
        })
    }
    
    return(
        <div className="login-signup-form animated fadeInDown">
        <div className="form">
            <form onSubmit={onSubmit}>
                <h1 className="title">
                    Login to Your account
                </h1>
                {errors && <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                    </div>}
                <input ref={emailRef} type="email" placeholder="Email address" />
                <input ref={passwordRef} type="password" placeholder="Password" />
                <button className="btn btn-block">Login</button>
                <p className="message">
                    Not Registered? <Link to="/signup">Create an account</Link>
                </p>
            </form>
        </div>
        </div>
    )
}