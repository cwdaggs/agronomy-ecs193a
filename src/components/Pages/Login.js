import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientID = '652800520818-5rp0q395un8cc2urq17bctiij15hmqn6.apps.googleusercontent.com';

function Login() {
    const onSuccess = (res) => {
        console.log("Successfully logged in: " + res.profileObj.name);
        console.log(res);
    };

    const onFailure = (err) => {
        console.log("Failed to log in: " + err);
    };

    return(
        <div>
            <GoogleLogin
                clientId={clientID}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'http://localhost:3000'}
                style={{ marginTop: '100px' }}
                isSignedIn={true}
            />
        </div>
    );
}

export default Login;