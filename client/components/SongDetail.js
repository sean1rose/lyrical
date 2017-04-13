import React, { Component } from 'react';

// helper to glue together a query and a react component...
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

// query...
import fetchSong from '../queries/fetchSong';

import LyricCreate from './LyricCreate';

class SongDetail extends Component {
  render() {
    const { song } = this.props.data;

    if (!song) { return <div>Loading...</div>}
  
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricCreate />
      </div>
    );
  }
}

// rendering a component wrapped by graphql helper, which knows props coming down into SongDetail component
  // options takes props intended for SongDetail, provides to the query when it's made (provides the id)
export default graphql(fetchSong, {
  options: (props) => { return { variables: { id: props.params.id } } }
})(SongDetail);