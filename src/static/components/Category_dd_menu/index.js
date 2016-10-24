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

      fetch("localhost:8000/api/categories/")
      .then(res=> {
        const categories = res.data.data.children.map(obj => obj.data);
        this.setState({categories});
      });
    }



    render() {
        return (
          <div>
            <div className="ui selection dropdown" ref="dropdown">
              <input type="hidden" name="Categories"/>
              <i className="dropdown icon"></i>
              <div className="default text">Categories</div>
              <div className="menu">
                <div className="item" data-value="0">this.state.categories[0]</div>
                <div className="item" data-value="1">this.state.categories[1]</div>
                <div className="item" data-value="2">this.state.categories[2]</div>

              </div>
            </div>

          </div>
        )
      }
    }

export default(category_dd_menu);
