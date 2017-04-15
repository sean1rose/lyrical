import React, { Component } from 'react';

// helper to glue together a query and a react component...
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

// fetchSong QUERY (used to grab a song and its lyrics - allows us to use just 1 query)!!!...
import fetchSong from '../queries/fetchSong';
// ***cuz of react-apollo, the query RETURNS DATA as this.props.data
// can pass lyrics into LyricList (child) component

import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
  render() {
    const { song } = this.props.data;
    // this.props.data is returning the data from our graphql query (fetchSong)

    // ***component tries to render 1 time before data is fetched - check to make sure data is available before consuming it
    if (!song) { return <div>Loading...</div>}
  
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={this.props.params.id} />
      </div>
    );
  }
}

// 1. write the query, 2. wrap w/ a graphql helper, 3) pass in the component that should receive that data
// rendering a component wrapped by graphql helper, which knows props coming down into SongDetail component
  // options takes props intended for SongDetail, provides to the query when it's made (provides the id)
export default graphql(fetchSong, {
  options: (props) => { return { variables: { id: props.params.id } } }
})(SongDetail);