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
                    <h2><a href="/">AGORA</a></h2>
                  </div>
                  <a className="item" href="/listing">Listings</a>
                  <a className="item" href="/about">About</a>
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
                    <a className="ui primary button" href="/verify">Log In</a>
                  </div>
                </div>
            </div>
        );
    }
}

export default (NavBar);
