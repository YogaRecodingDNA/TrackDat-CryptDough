import React from 'react';
import './Coins.css';
import Footer from './footer/Footer';

const Home = () => {

    return (
        <div >
            <h1 className='titleSifter'>THIS PLANET IS YOUR HOME</h1>
            <h2 className='h2'>TAKE IT BACK FROM THE BANKS</h2>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Footer />
        </div>
    )
}

export default Home;

/* 
fetch(`${URL}/cryptoList`)
  .then((response) => response.json())
  .then((products) => {
    this.setState({ products })
  })
 */

  /* 
GET	api/tutorials	get all Tutorials
GET	api/tutorials/:id	get Tutorial by id
POST	api/tutorials	add new Tutorial
PUT	api/tutorials/:id	update Tutorial by id
DELETE	api/tutorials/:id	remove Tutorial by id
DELETE	api/tutorials	remove all Tutorials
GET	api/tutorials?title=[kw]	find all Tutorials which title contains 'kw'
  */