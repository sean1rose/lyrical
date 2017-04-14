// this file sets up the APOLLO STORE

import './style/style.css';
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
import SongDetail from './components/SongDetail';


// create new instance of ApolloClient, and pass it to ApolloProvider
  // assumes that graphql is available on /graphql route
const client = new ApolloClient({
  dataIdFromObject: o => o.id
});
// ^ **STORE**

  // http://dev.apollodata.com/react/cache-updates.html
  // Caching system... (rather than using the follow up refetch query)
  // dataIdFromObject -> helps apollo identify its data - take every piece of data and run it thru the function to identify each piece of data
    // look at every record and use the 'id' field to identify each record
      // so now need to make sure to ask for id every time we make a graphql query
      // **now apollo knows when a record is updated, don't need to manually ask it to refresh and refetch; it automatically re-renders

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
          <Route path="songs/:id" component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
