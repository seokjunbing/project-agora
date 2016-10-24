import React from 'react';

class Account extends React.Component {
    render() {
        return (
          <div>
            <div className="ui menu">
              <a className="browse item active">
                Browse
                <i className="dropdown icon"></i>
              </a>
            </div>
            <div className="ui fluid popup bottom left transition hidden">
              <div className="ui four column relaxed equal height divided grid">
                <div className="column">
                  <h4 className="ui header">Fabrics</h4>
                  <div className="ui link list">
                    <a className="item">Cashmere</a>
                    <a className="item">Linen</a>
                    <a className="item">Cotton</a>
                    <a className="item">Viscose</a>
                  </div>
                </div>
                <div className="column">
                  <h4 className="ui header">Size</h4>
                  <div className="ui link list">
                    <a className="item">Small</a>
                    <a className="item">Medium</a>
                    <a className="item">Large</a>
                    <a className="item">Plus Sizes</a>
                  </div>
                </div>
                <div className="column">
                  <h4 className="ui header">Colored</h4>
                  <div className="ui link list">
                    <a className="item">Neutrals</a>
                    <a className="item">Brights</a>
                    <a className="item">Pastels</a>
                  </div>
                </div>
                <div className="column">
                  <h4 className="ui header">Types</h4>
                  <div className="ui link list">
                    <a className="item">Knitwear</a>
                    <a className="item">Outerwear</a>
                    <a className="item">Pants</a>
                    <a className="item">Shoes</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }

export default(Account);
