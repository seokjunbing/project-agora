import React from 'react';

class WelcomeBanner extends React.Component {
    render() {
        return (
            <div className="ui raised very padded text container segment">
              <h2 className="ui header">Welcome to Agora!</h2>
              <p>The Dartmouth student marketplace</p>
            </div>
        );
    }
}

export default (WelcomeBanner);
