import React from 'react';
import { Card, Modal, Button, Header, Image, Divider } from 'semantic-ui-react';

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
            textAlign: 'center',
        }
        var myImage = require("../../images/tv.jpg");
        return (
            <Card style={style1}>
                <Image src={myImage}/>
                <Modal trigger={<Button><h2>{this.props.title}</h2></Button>}>
                    <Modal.Header>
                        <Image wrapped size='medium' src='http://semantic-ui.com/images/wireframe/image.png'/>
                    </Modal.Header>
                    <Modal.Content>
                      <Modal.Description>
                        <Header as='h2'>{this.props.title}</Header>
                        <Header sub>Price</Header>
                        <span>${this.props.price}</span>
                        <Divider/>
                        <p>{this.props.description}</p>
                      </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button positive icon='mail outline' labelPosition='right' content='Contact Seller' />
                      </Modal.Actions>
                  </Modal>
                <Card.Content extra>
                    <Button.Group style={style3}>
                        <Button>${this.props.price}</Button>
                        <Button primary>Contact</Button>
                    </Button.Group>
                </Card.Content>
              </Card>
        );
    }
}

export default (ListingTile);
