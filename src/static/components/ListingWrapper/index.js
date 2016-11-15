import React from 'react';
import { Segment } from 'semantic-ui-react';
import ListingTile from '../ListingTile';

class ListingWrapper extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
        return (
            <div>
                <div className="ui link cards">
                    {
                        this.props.listings.map(listing => {
                            return <ListingTile key={listing.id} title={listing.title} category={listing.category} description={listing.description} price={listing.price}/>;
                        })
                    }
                </div>
            </div>
        );
    }
}

export default(ListingWrapper);
