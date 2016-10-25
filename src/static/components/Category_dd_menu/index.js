import React from 'react';


class category_dd_menu extends React.Component {

    constructor(props) {
      $('.ui.dropdown').dropdown();

      super(props);

      this.state = {
        categories: []
      };
    }

    componentDidMount() {
      $('.ui.dropdown').dropdown();
      var _this = this;
      var apiString = window.location.protocol + '//' + window.location.host + '/api/categories/';
      $.get(apiString, function(data) { _this.setState({categories: data.results}); });
    }



    render() {
        return (
          <div>
            <div className="ui selection dropdown" ref="dropdown">
              <input type="hidden" name="Categories"/>
              <i className="dropdown icon"></i>
              <div className="default text">Categories</div>
              <div className="menu">
                  {this.state.categories.map(function(category) {
                    return (
                      <div className="item" key={category.id}>{category.name}</div>
                    );
                  })}
              </div>
            </div>

          </div>
        )
      }
    }

export default(category_dd_menu);
