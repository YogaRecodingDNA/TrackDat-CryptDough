import React from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './navBar.css';
// import Login from '../pages/Login';


const Navbar = () => {

    const [cookie, removeCookie] = useCookies(['token', 'loggedIn']);

    const logout = () => {
        console.log("lOGOUT FIRED");
        console.log('login cookie', cookie.loggedIn);
        console.log('token cookie', cookie.token);
        removeCookie('token');
        removeCookie('loggedIn');
    };

    let renderThis;

    if (!cookie.loggedIn || cookie.loggedIn === 'undefined') {
 
     renderThis =
             <div>
                <nav className="navbar navSifter">
                    <Link className="navbar-brand anchorNav" to='/'>HOME</Link>
                    <Link className="navbar-brand anchorNav" to='/about'>ABOUT</Link>
                    <Link className="navbar-brand anchorNav" to='/coins'>COINS LIST</Link>
                    <Link className="navbar-brand anchorNav" to='/login'>Login</Link>
                    <Link className="navbar-brand anchorNav" to='/register'>Register</Link>
                </nav>
            </div>
     
     } else {

         renderThis =
             <div>
                 <nav className="navbar navSifter">
                     <Link className="navbar-brand anchorNav" to='/'>HOME</Link>
                     <Link className="navbar-brand anchorNav" to='/coins'>COINS LIST</Link>
                     <Link className="navbar-brand anchorNav" to='/myList'>CURATED LIST</Link>
                     <Link onClick={logout} className="navbar-brand anchorNav" to='/'>Logout</Link>
                 </nav>
             </div>
         
    }
    
    return (
        renderThis
   )
    
};

export default Navbar;
