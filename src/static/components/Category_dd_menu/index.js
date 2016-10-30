import React from 'react';


class CategoryDropdown extends React.Component {

    constructor(props) {
      $('.ui.dropdown').dropdown();

      super(props);

      this.state = {
        categories: []
      };
    }

    componentDidMount() {
      $('.ui.dropdown').dropdown();
      var apiString = window.location.protocol + '//' + window.location.host + '/api/categories/';
      fetch(apiString)
        .then(data => data.json())
        .then(data => { this.setState({categories: data.results}); });
    }



    render() {
        return (
          <div>
            <div className="ui selection dropdown" ref="dropdown">
              <input type="hidden" name="Categories"/>
              <i className="dropdown icon"></i>
              <div className="default text">Categories</div>
              <div className="menu">
                  {this.state.categories.map((category) => {
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

export default(CategoryDropdown);
