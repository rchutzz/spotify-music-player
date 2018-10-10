import React, { Component } from 'react';
import './App.css';

class Profile extends Component {

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  render() {
    let artist = {
      name: '',
      followers: {total: ''},
      images: [
          {url: ''}
      ],
      genres: []
    };
    artist = this.props.artist !== null ? this.props.artist : artist;

    return (
      <div className="profile">
        <img 
          className="profile_image"
          src={artist.images[0].url} 
          alt="Profile"
        />
        <div className="profile_info">
          <div className="profile_name">{artist.name}</div>
          <p class="script"></p>
          <div className="profile_followers">
            {this.numberWithCommas(artist.followers.total)} followers
          </div>
          <div className="profile_genres">
            {
              artist.genres.map((genre, key) => {
                genre = key !== artist.genres.length-1 
                  ? `${genre}, ` 
                  : `& ${genre}`;
                return (
                  <span key={key}>{genre}</span>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;