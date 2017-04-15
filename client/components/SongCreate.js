// 1. create form, 2. wire up navigation w/ reactrouter, 3. hook up mutation
import React, { Component } from 'react';
// import react-apollo library helper to integrate graphql w/ react
import { graphql } from 'react-apollo';

// import gql to write graphql queries and mutations inside of our component files
import gql from 'graphql-tag';

// this is used in refetchQueries in the mutate function
import fetchSongsQuery from '../queries/fetchSongs';

import { Link, hashHistory } from 'react-router';

class SongCreate extends Component {
  constructor(props){
    super(props);
    this.state = { title: '' };
  }

  onSubmit(event) {
    event.preventDefault();

    // MUTATION -> manipulates data 
    // call the query (along w/ config obj containing query variables)
      // this.state.title is the query/form input value -> pass into mutate function as query variable
      // refetchQueries to Refresh Data: takes array of queries that rerun after mutation is successfully executed
        // pass in [actual graphql query] -> **want to call fetchsongs query again (same query from SongList component) after submission, cuz Graphql doesn't automatically refresh list after 1 song is added**
        // need to use this method of updating because songlist component is unrelated to this component
    this.props.mutate({
      variables: {
        title: this.state.title
      },
      refetchQueries: [{ query: fetchSongsQuery }]
    }).then(() => hashHistory.push('/'));
    // kick user ^ back to root route. hashistory obj is used by RR to keep track of navigation state
    // ***but need apollo to RE-run fetchSongs query to get new updated song list with newly added song from this mutation (graphql doesn't automatically add and refresh, need to instruct it to do so)
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

// *call this.props.mutate in order to call this function...
const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);