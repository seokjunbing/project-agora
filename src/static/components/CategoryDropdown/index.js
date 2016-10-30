import React from 'react';
import { Dropdown } from 'semantic-ui-react';

var options = [];

class CategoryDropdown extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        categories: []
      };
    }

    componentDidMount() {
      var apiString = window.location.protocol + '//' + window.location.host + '/api/categories/';
      fetch(apiString)
        .then(data => data.json())
        .then(data => {
            this.setState({categories: data.results});
            data.results.map(category => {
                var option = {text: category.name, value: category.id};
                options.push(option);
            })
        });
    }

    render() {
        return (
            <Dropdown placeholder='Categories' fluid selection options={options}/>
        )
      }
    }

export default(CategoryDropdown);
