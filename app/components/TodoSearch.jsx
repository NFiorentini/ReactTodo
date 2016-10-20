const React          = require('react');

const TodoSearch = React.createClass({

  handleSearch: function () {
    const showCompleted = this.refs.showCompleted.checked;
    const searchText = this.refs.searchText.value;

    this.props.onSearch(showCompleted, searchText);
  },

  render: function () {
    return (
      <div className="container__header">
        <div>

          <input type="search" ref="searchText"
              placeholder="Search todos"
              onChange={this.handleSearch}/>

        </div>
        <div>
          <label>

            {/*
            The onChange attribute is called every time
            the input's value changes.
            */}
            <input type="checkbox" ref="showCompleted"
                onChange={this.handleSearch}/>
                Show completed todos
          </label>

        </div>
      </div>
    )
  }
});

module.exports = TodoSearch;
