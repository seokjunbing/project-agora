import React from 'react';
import {Modal, Button, Header} from 'semantic-ui-react';

class ListingTile extends React.Component {
    constructor(props) {
      super(props);
    }

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
        var myImage = require("../../images/tv.jpg");
        return (
            <div className="ui card" style={style1}>
                <div className="image">
                    <img src={myImage}/>
                </div>
                <Modal trigger={<Button><h2>{this.props.title}</h2></Button>}>
                    <Modal.Header>{this.props.title}</Modal.Header>
                    <Modal.Content>
                      <Modal.Description>
                        <p>{this.props.description}</p>
                        <p>{this.props.price}</p>
                      </Modal.Description>
                    </Modal.Content>
                  </Modal>
                <div className="extra content">
                    <div className="ui buttons" style={style3}>
                        <button className="ui button">${this.props.price}</button>
                        <button className="ui primary button">Contact</button>
                    </div>
                </div>
              </div>
        );
    }
}

export default (ListingTile);
