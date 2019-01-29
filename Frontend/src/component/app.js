import React from 'react';
import { BrowserRouter as Router, Route, Link  } from 'react-router-dom';
import Header from './header';
import Content from './content';
import Footer from './footer';
import Dashboard from './dashboard'
import Signin from './signin'

export default() => {
    return(

    <Router>
        <div>
            <Header />
            <Content />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/signin" component={Signin} />
            <Footer />
        </div>
        </Router>
        
    );
};