import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientID = '652800520818-5rp0q395un8cc2urq17bctiij15hmqn6.apps.googleusercontent.com';

function Logout() {
    const onSuccess = () => {
        alert('Logged out successfully');
    };

    return(
        <div>
            <GoogleLogout
                clientId={clientID}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout;