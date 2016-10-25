import React from 'react';

class ListingTile extends React.Component {
    render() {
        var style1 = {
            marginLeft: '15px',
        }
        var style2 = {
            textAlign: 'center',
        }
        var style3 = {
            display: 'block',
            margin: 'auto',
            width: '70%',
        }
        var myImage = require("../../images/agora_icon.png");
        return (
            <div className="ui card" style={style1}>
                <div className="image">
                    <img src={myImage}/>
                </div>
                <div className="content">
                  <h2 style={style2}>Greek Temple</h2>
                </div>
                <div className="extra content">
                    <div className="ui buttons" style={style3}>
                        <button className="ui button">$100.00</button>
                        <button className="ui primary button">Contact</button>
                    </div>
                </div>
              </div>
        );
    }
}

export default (ListingTile);
