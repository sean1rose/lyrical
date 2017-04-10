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
  renderSongs() {
    // iterate over array of songs and return 1 jsx tag for each
    return this.props.data.songs.map(song => {
      return (
        <li key={song.id} className="collection-item">
          {song.title}
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

// graphql helper:
  // glue component to graphql query (sort of like redux) -> executes query when component is rendered
  // graphql returns a function, which is immediately invoked w/ 2nd set of parenthesis
export default graphql(fetchSongsQuery)(SongList);


// Graphql strategy:
  // don't need to overfetch the data - ***only fetch what you need!**
  // in this component - Song list only needs the song title!
  
  // STEPS:
  // 1. what data is req'd by song list? -> title of each song only
  // 2. write query out in component file -> import 'gql' from "graphql-tag" library to write queries
  // 3. bond query to component -> import  {graphql} from 'react-apollo' libray