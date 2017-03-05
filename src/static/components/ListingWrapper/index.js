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
                            return <ListingTile key={listing.id} listing={listing} listingId={listing.id} author_id={listing.author_pk} author={listing.author_str} title={listing.title} category={listing.category_name} description={listing.description} price={listing.price} date={listing.listing_date} extraPriceInfo={this.extraPriceInfo(listing.price_type)} images={listing.images} image_dimensions={listing.image_dimensions}/>;
                        })
                    }
                </div>
            </div>
        );
    }
}

export default(ListingWrapper);
