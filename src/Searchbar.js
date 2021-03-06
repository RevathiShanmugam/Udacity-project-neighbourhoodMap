
import React, { Component } from 'react'

class SearchBar extends Component {

  render() {
      return (
        <div className="locationsFilter" role="application">
          <input
          type="text"
          autoFocus
          id="query-Filter"
          placeholder="Search..."
          aria-label="Locations filter"
          value={this.props.query}
          onChange={event => this.props.updateQuery(event.target.value)}
          />
          <button className="filterButton" type="filter"><i className="fa fa-filter"></i></button>
        </div>
      );
    }
}


export default SearchBar;