import React from 'react';
import { Segment, Card } from 'semantic-ui-react';
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
        var style1 = {
            justifyContent: 'center',
        }
        return (
            <div>
                <Card.Group style={style1}>
                    {
                        this.props.listings.map(listing => {
                            return <ListingTile key={listing.id} listing={listing} listingId={listing.id} author_id={listing.author_pk} author={listing.author_str} title={listing.title} category={listing.category_name} description={listing.description} price={listing.price} date={listing.listing_date} extraPriceInfo={this.extraPriceInfo(listing.price_type)} images={listing.images} image_dimensions={listing.image_dimensions}/>;
                        })
                    }
                </Card.Group>
            </div>
        );
    }
}

export default(ListingWrapper);
