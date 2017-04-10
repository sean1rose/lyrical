// import gql to write graphql queries and mutations inside of our component files
import gql from 'graphql-tag';

export default gql`
  {
    songs {
      id
      title
    }
  }
`;