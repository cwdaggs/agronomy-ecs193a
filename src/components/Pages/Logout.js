import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientID = '652800520818-5rp0q395un8cc2urq17bctiij15hmqn6.apps.googleusercontent.com';

function Logout() {
    const onSuccess = () => {
        window.location.reload(true);
        alert('Logged out successfully');
    };

    return(
        <div>
            <div id="logoutButton">
                <GoogleLogout
                    clientId={clientID}
                    buttonText="Logout"
                    onLogoutSuccess={onSuccess}
                />
            </div>
        </div>
    )
}

export default Logout;