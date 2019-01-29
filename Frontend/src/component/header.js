import React, {Component} from 'react';
//import {Link} from 'react-router-dom';


export default class Header extends Component{
    render(){
        return(
            <div class='navbar navbar-expand-lg navbar-light bg-light'>
                <div class="col-xl-6 col-md-6 col-sm-12">
                    <a class="navbar-brand">Human cloud Business Solution</a>
                        </div>
                        <div class="col-xl-6 col-md-6 col-sm-12">
                            <div class="collapse navbar-collapse">

                                    <ul class="navbar-nav ml-auto">
                                        <li class="nav-item">
                                            <a class="nav-link">Dashboard</a>
                                        </li>
                                        <li class="nav-item">
                                                <a class="nav-link">Sign In</a>
                                        </li>
                                        <li class="nav-item">
                                                <a class="nav-link">Sign Up</a>
                                        </li>
                                        <li class="nav-item">
                                                <a class="nav-link">Sign Out</a>
                                        </li>
                                    </ul>
                            
                            </div>
                    </div>
            </div>
        );
    }
}