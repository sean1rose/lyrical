import React from 'react';
import ReactDOM from 'react-dom';
// AC is interacting w/ our graphql on backend, makes requests for data then stores locally when response comes back
import ApolloClient from 'apollo-client';

// is like the glue b/w react and apollo
  // pass client as a prop
import { ApolloProvider } from 'react-apollo';


// create new instance of ApolloClient, and pass it to ApolloProvider
  // assumes that graphql is available on /graphql route
const client = new ApolloClient({});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <div>Lyrical</div>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
