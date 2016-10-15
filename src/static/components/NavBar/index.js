import React from 'react';

class NavBar extends React.Component {
    render() {
        return (
            <div className="ui top fixed menu">
              <div className="item">
                <h2>AGORA</h2>
              </div>
              <a className="item">Listings</a>
              <a className="item">About</a>
              <div className="item">
                <div className="ui category search item">
                  <div className="ui transparent icon input">
                    <input className="prompt" type="text" placeholder="Search listings..."/>
                    <i className="search link icon"></i>
                  </div>
                  <div className="results"></div>
                </div>
              </div>
              <div className="right item">
                <div className="ui primary button">Log In</div>
              </div>
            </div>
        );
    }
}

export default (NavBar);
