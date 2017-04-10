import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
// AC is interacting w/ our graphql on backend, makes requests for data then stores locally when response comes back
import ApolloClient from 'apollo-client';

// is like the glue b/w react and apollo
  // pass client as a prop
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';


// create new instance of ApolloClient, and pass it to ApolloProvider
  // assumes that graphql is available on /graphql route
const client = new ApolloClient({});
// ^ STORE

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
        </Route>
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
