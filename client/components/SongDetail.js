import React, { Component } from 'react';

// helper to glue together a query and a react component...
import { graphql } from 'react-apollo';
// query...
import fetchSong from '../queries/fetchSong';

class SongDetail extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h3>Song Detail</h3>
      </div>
    );
  }
}

// rendering a component wrapped by graphql helper, which knows props coming down into SongDetail component
  // options takes props intended for SongDetail, provides to the query when it's made (provides the id)
export default graphql(fetchSong, {
  options: (props) => { return { variables: { id: props.params.id } } }
})(SongDetail);