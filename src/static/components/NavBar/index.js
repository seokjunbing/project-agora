import React from 'react';

class NavBar extends React.Component {
    render() {
        var style = {
            marginBottom: '80px'
        }
        return (
            <div style={style}>
                <div className="ui top fixed menu">
                  <div className="item">
                    <h2>AGORA</h2>
                  </div>
                  <a className="item" href="/listing">Listings</a>
                  <a className="item">About</a>
                  <a className="item" href="/account">Account</a>
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
            </div>
        );
    }
}

export default (NavBar);
