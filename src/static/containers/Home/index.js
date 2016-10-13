import React from 'react';
import { connect } from 'react-redux';
import ReactDom from 'react-dom';


class HomeView extends React.Component {

    static propTypes = {
        statusText: React.PropTypes.string
    };

    componentDidMount() {
        $(ReactDom.findDOMNode(this.refs.dropdown)).dropdown();
    }

    componentDidUpdate() {
        $(ReactDom.findDOMNode(this.refs.dropdown)).dropdown('refresh');
    }

    render() {
        return (
            <div className="ui top fixed menu">
              <div className="item">
                <h2>AGORA</h2>
              </div>
              <a className="item">Listings</a>
              <a className="item">About</a>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        statusText: state.auth.statusText
    };
};

export default connect(mapStateToProps)(HomeView);
export { HomeView as HomeViewNotConnected };
