import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

export default class Content extends Component{

      responseGoogle = (response) => {
        console.log(response);
      }
    render(){
        return(
             <div class="container" style={{marginTop:40}}>
                    <div class="row">
                        <div class="col-xl-6 col-sm-12 col-md-12 ">
                            
                            <form>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Email address</label>
                                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                                    </div>
                                    <br />
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </form>
                        </div>
                    <div class="col-xl-6 col-sm-12 col-md-12" align="center">
                           
                            <div class="col-xl-8">
                                    <h3>Sign In using</h3><br />
                                    <FacebookLogin
                                        appId="389230111637590"
                                        buttonText="Facebook"
                                        fields="name,email,picture"
                                        callback=""
                                        className="btn btn-primary btn-block"
                                      />
                                      <br /><br />
                                      <GoogleLogin 
                                        clientId="572480021249-tma02oi1tfusbeo1ojq78d3us4sdl3aa.apps.googleusercontent.com"
                                        buttonText="Google"
                                        onSuccess = {this.responseFacebook}
                                        onFailure=""
                                        className="btn btn-success btn-block"
                                      />
                            </div>
                        </div>
                    </div>

             </div>
           
        );
    }
}