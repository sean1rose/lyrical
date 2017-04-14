import React, { Component } from 'react';

class LyricList extends Component {
  onLike(id) {
    console.log('ID! - ', id);
  }
  
  renderLyrics() {
    return this.props.lyrics.map(({ id, content }) => {
      // for every lyric list item -> render a chunk of jsx
      return (
        <li key={id} className="collection-item">
          {content}
          <i className="material-icons" onClick={() => this.onLike(id)}>thumb_up</i>
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="collection">
        {this.renderLyrics()}
      </ul>
    );
  }
}

export default LyricList;