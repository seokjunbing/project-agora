import React from 'react';
import ListingTile from '../ListingTile';

class ListingWrapper extends React.Component {
    render() {
        return (
            <div className="ui link cards">
                <ListingTile/>
                <ListingTile/>
                <ListingTile/>
                <ListingTile/>
            </div>
        );
    }
}

export default (ListingWrapper);
