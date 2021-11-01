import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Coins.css';

const url = "http://localhost:9108/register";

const Register = () => {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        let userInfo = JSON.stringify({
            email: email,
            username: username,
            password: password,
            repeatPassword: repeatPassword,
        });
        
        // FETCH DATA
        fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: userInfo,
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("DATA", data);
            console.log("errorMsg inside", data.errorMsg);
            if(data.errorMsg){
                setErrorMsg(data.errorMsg);
            } else {
                setErrorMsg(null);
                setSuccessMsg("Registration successful. Login to start sifting!");
                setTimeout(() => {
                    history.push('/login');
                }, 2500);
            }
        })
        .catch(error => console.error(error));
        
    };

    
    const handleChange = (e) => {
        if(e.target.name === 'email') {
            setEmail(e.target.value);
            console.log('email onChange', email);
        } else if(e.target.name === 'username') {
            setUsername(e.target.value);
            console.log('username onChange', username);
        } else if(e.target.name === 'password'){
            setPassword(e.target.value);  
            console.log('password onChange', password);
        } else if(e.target.name === 'repeatPassword'){
            setRepeatPassword(e.target.value);  
            console.log('repeatPassword onChange', repeatPassword);
        }
    };

    return (
        <div>
            <h1 className="text-center login">Register</h1>
            <div className="d-flex justify-content-center">
            {errorMsg && <div className="alert alert-danger" role="alert" style={{textAlign: 'center'}}>{errorMsg}</div>}
            {successMsg && <div className="alert alert-success" role="alert" style={{textAlign: 'center'}}>{successMsg}</div>}
            </div>
            <form className="text-center mb-3 login" onSubmit={handleSubmit}>
                <div>
                    <label className="form-label">
                        Enter Email
                        <input type="text" className="form-control" name="email" onChange={handleChange}/>
                    </label>
                </div>
                <br/>
                <div>
                    <label className="form-label">
                        Create Username
                        <input type="text" className="form-control" name="username" onChange={handleChange}/>
                    </label>
                </div>
                <br/>
                <div>
                    <label className="form-label">
                        Create Password
                        <input type="text" className="form-control" name="password" onChange={handleChange}/>
                    </label>
                </div>
                <br/>
                <div>
                    <label className="form-label pad-btm">
                        Repeat Password
                        <input type="text" className="form-control" name="repeatPassword" onChange={handleChange}/>
                    </label>
                </div>
                <input type="hidden" name="userCoins" value="{coin: amount}"></input>
                <button type="submit" className="btn btn-secondary btn-submit">Submit</button>
            </form>
        </div>
    )
}

export default Register;
