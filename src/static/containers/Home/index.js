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
            <div>
                <div className="ui top fixed menu">
                  <div className="item">
                    <h2>AGORA</h2>
                  </div>
                  <a className="item">Listings</a>
                  <a className="item">About</a>
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
                    <div className="ui primary button">Log In</div>
                  </div>
                </div>
                <div className="ui raised segment">
                  <p>Welcome to Agora, the Dartmouth student marketplace.</p>
                </div>
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
