import React from "react";
import {Link} from 'react-router-dom';
const MainPage = (props) => {

    return(
        <div>
            <nav className="navbar navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand">Expense Tracker</a>
                    <form className='d-flex'>
                        <Link className='btn btn-outline-light' to="/login">Sign In</Link>
                    </form>
                </div>
            </nav>
            <div className="center-head">
                <h1 className="head">Expense Tracker App</h1>
                <div className="main-desc">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                    Doloremque optio ullam voluptate sit, quis dolorum officiis, consequuntur 
                    commodi voluptas deleniti nihil facilis. Enim facere sit obcaecati quia 
                    non, sapiente cumque sed tempora laboriosam vitae perferendis nam.
                </div>
                <Link className="main-btn" to="/login" >Login</Link>
            </div>
        </div>
    );
}

export default MainPage;