import React from 'react';
import { Segment } from 'semantic-ui-react';
import ListingTile from '../ListingTile';

class ListingWrapper extends React.Component {
    constructor(props) {
      super(props);
    }

    extraPriceInfo(type) {
        switch(type) {
            case 'PT':
                return '/term';
                break;
            case 'MO':
                return '/mo';
                break;
            case 'WE':
                return '/wk';
                break;
            case 'DA':
                return '/day';
                break;
            default:
                return '';
        }
    }

    render() {
        return (
            <div>
                <div className="ui link cards">
                    {
                        this.props.listings.map(listing => {
                            return <ListingTile key={listing.id} title={listing.title} category={listing.category} description={listing.description} price={listing.price} extraPriceInfo={this.extraPriceInfo(listing.price_type)} pictures={listing.pictures}/>;
                        })
                    }
                </div>
            </div>
        );
    }
}

export default(ListingWrapper);
