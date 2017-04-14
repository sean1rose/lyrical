import gql from 'graphql-tag';

// query grabs a particular song, and provides title, id. Can also ask for lyrics too, which wil lbe used by LyricList component (child component of SongDetail component)
export default gql`
  query SongQuery ($id: ID!) {
    song(id: $id) {
      title
      id
      lyrics {
        id
        content
      }
    }
  }
`;