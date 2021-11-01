import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import './Coins.css';

const url = 'http://localhost:9108/login';

const Login = () => {
    const history = useHistory();

    const [errorMsg, setErrorMsg] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cookie, setCookie, removeCookie] = useCookies(['token', 'loggedIn']);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        let userCredentials = JSON.stringify({
            username: username,
            password: password,
        });

        // FETCH DATA
        fetch (url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: userCredentials,
        }).then( res => {
            return res.json();
        })
        .then((data) => {
            if (data.token){
                setCookie('token', data.token);
                setCookie('loggedIn', true);
                setTimeout(() => {
                    removeCookie('loggedIn');
                    removeCookie('token');
                    history.push('/login');
                }, 3600 * 1000);

                setTimeout(() => {
                    alert('Your Sifting session will end 5 minutes for your protection! Login again to continue sifting');
                }, 3300 * 1000);

                if(cookie.loggedIn) {
                    history.push('/coins');
                } else {
                    history.push('/login');
                }
            } else if (data.errorMsg) {
                setErrorMsg(data.errorMsg);
            }
            console.log("DATA ==========>", data);
        })
        .catch(error => console.log(error));
    };


    const handleChange = (e) => {
        if(e.target.name === 'username') {
            setUsername(e.target.value);
            console.log('username onChange', username);
        } else if(e.target.name === 'password'){
            setPassword(e.target.value);  
            console.log('password onChange', password);
        }
    };
    
    return (
        <div>
            <h1 className="text-center login">Login</h1>
            <br/>
            {errorMsg && <div className="alert alert-info" role="alert">{errorMsg}</div>}
            <form className="text-center mb-3 login" onSubmit={handleSubmit}>
                <div>
                    <label className="form-label">
                        Username
                        <input type="text" className="form-control" name="username" onChange={handleChange}/>
                    </label>
                </div>
                <br/>
                <div>
                    <label className="form-label pad-btm">
                        Password
                        <input type="text" className="form-control" name="password" onChange={handleChange}/>
                    </label>
                </div>
                <button type="submit" className="btn btn-secondary btn-submit">Submit</button>
            </form>
        </div>
    )
}

export default Login;


        // <div>

        // <div className="container-login100">
        //     ::before
        //     <div className="wrap-login100">
        //         <form className="login100-form validate-form">
        //             <span className="login100-form-logo">
        //                 <i className="zmdi zmdi-landscape">
        //                     ::before
        //                 </i>
        //             </span>
        //             <span className="login100-form-title p-b-34 p-t-27">Log in</span>
        //             <div className="wrap-input100 validate-input" data-validate="Enter username">
        //                 <input className="input100" type="text" name="username" placeholder="Username" />
        //                 <span className="focus-input100" data-placeholder="">
        //                     ::before
        //                     ::after
        //                 </span>
        //             </div>
        //             <div className="wrap-input100 validate-input" data-validate="Enter password">
        //                 <input className="input100" type="password" name="pass" placeholder="Password" />
        //                 <span className="focus-input100" data-placeholder="">
        //                     ::before
        //                     ::after
        //                 </span>
        //             </div>
        //             <div className="contact100-form-checkbox">
        //                 <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
        //                 <label className="label-checkbox100" for="ckb1">
        //                     ::before
        //                     Remember me
        //                 </label>
        //             </div>
        //             <div className="container-login100-form-btn">
        //                 <button className="login100-form-btn">
        //                     ::before
        //                     Login
        //                 </button>
        //             </div>
        //             <div className="text-center p-t-90">
        //                 <a className="txt1" href="/register">Forgot Password?</a>
        //             </div>
        //         </form>
        //     </div>
        // </div>
        // </div>