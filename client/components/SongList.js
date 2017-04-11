// all logic for fetching a List of songs and rendering them on the screen
import React, { Component } from 'react';
import gql from 'graphql-tag';

import fetchSongsQuery from '../queries/fetchSongs';

// GLUE layer b/w react and data-source - used to bond component w/ query
import { graphql } from 'react-apollo';
  // data returned from query (after query is completed) is accessible via props (this.props.data.songs)

// Link tag == anchor tag to navigate
import { Link } from 'react-router';

class SongList extends Component {
  onSongDelete(id) {
    // calls mutation to delete song, which expects an id, use promise + refetch to automatically re-execute associated queries (here query is associated w/ this component)
    this.props.mutate({variables: { id } })
      .then(() => this.props.data.refetch());
  }
  
  renderSongs() {
    // iterate over array of songs and return 1 jsx tag for each
    return this.props.data.songs.map(( { id, title }) => {
      return (
        <li key={id} className="collection-item">
          {title}
          <i className="material-icons" onClick={() => this.onSongDelete(id)} >
          delete
          </i>
        </li>
      );
    })
  }

  render() {
    if (this.props.data.loading) { return <div>Loading...</div>}
    
    return (
      <div>
        <ul className="collection">
          {this.renderSongs() }
        </ul>
        <Link 
          to="/songs/new"
          className="btn-floating btn-large red right"
        >
        <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}


// mutation for deleting a song:
const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;


// graphql helper:
  // glue component to graphql query (sort of like redux) -> executes query when component is rendered
  // graphql returns a function, which is immediately invoked w/ 2nd set of parenthesis
export default graphql(mutation)(
  // need to call it twice since have 2 mutations (fetch songs + delete song)
    // make a helper using graphql w/ mutation, then immediately invoke it w/ the result of the 2nd graphql-mutation
  graphql(fetchSongsQuery)(SongList)
);


// Graphql strategy:
  // don't need to overfetch the data - ***only fetch what you need!**
  // in this component - Song list only needs the song title!
  
  // STEPS:
  // 1. what data is req'd by song list? -> title of each song only
  // 2. write query out in component file -> import 'gql' from "graphql-tag" library to write queries
  // 3. bond query to component -> import  {graphql} from 'react-apollo' libray