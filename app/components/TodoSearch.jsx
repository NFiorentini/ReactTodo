const actions             = require('actions');
const {connect}           = require('react-redux');
const React               = require('react');

export const TodoSearch = React.createClass({

  render: function () {

    const {dispatch, showCompleted, searchText} =
        this.props;

    return (
      <div className="container__header">
        <div>

          <input type="search" ref="searchText"
              placeholder="Search todos"
              value={searchText}

              onChange={() => {

                const searchText = this.refs
                    .searchText.value;

                dispatch(actions.setSearchText(searchText));
              }}/>

        </div>
        <div>
          <label>

            {/*
            The onChange attribute is called every time
            the input's value changes.
            */}
            <input type="checkbox" ref="showCompleted"
                checked={showCompleted}

                onChange={() => {
                  dispatch(actions.toggleShowCompleted());
                }}/>
                Show completed todos
          </label>

        </div>
      </div>
    )
  }
});

export default connect(
  (state) => {
    return {
      showCompleted: state.showCompleted,
      searchText: state.searchText
    };
  }
)(TodoSearch);
