import React, {useState} from 'react';
import { GoogleLogin } from 'react-google-login';
import {CommentBox} from './Comments';

const clientID = '652800520818-5rp0q395un8cc2urq17bctiij15hmqn6.apps.googleusercontent.com';

function Login() {
    var name = "";
    const [isLoggedIn, setLogIn] = useState(false);
    const [profile, setProfile] = useState(null);

    const onSuccess = (res) => {
        console.log("Successfully logged in: " + res.profileObj.name);
        // console.log(res);
        setProfile(res);
        setLogIn(true);
    };

    const onFailure = (err) => {
        console.log("Failed to log in: " + err);
    };

    if (isLoggedIn) {
        return(
            <div>
                <CommentBox profile={profile}></CommentBox>
            </div>
        );
    }
    else{
        return(
            <div>
                <br></br><br></br><br></br>
                <div id="login">
                    <h2>Please log in to Google to leave a comment or suggestion.</h2>
                    <div id="loginButton">
                        <GoogleLogin
                            clientId={clientID}
                            buttonText="Login"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={'http://localhost:3000'}
                            style={{ marginTop: '100px', alignSelf: 'center' }}
                            isSignedIn={true}
                        />
                    </div>
                </div>
            </div>
        );
    } 
}

export default Login;