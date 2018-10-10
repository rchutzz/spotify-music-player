import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import queryString from 'query-string';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            data: '',
            accessToken: '',
            artist: null,
            tracks: []
        }
    }

    search() {
        console.log('this.state', this.state);        
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        let FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';    
        let ALBUM_URL = 'https://api.spotify.com/v1/artists/'
        var accessToken = this.state.accessToken;
    
        var myOptions = {
          method: 'GET',
          headers:  {
            'Authorization': 'Bearer ' + accessToken
         },
          mode: 'cors',
          cache: 'default'
        };
    
        fetch(FETCH_URL, myOptions )
          .then(response => response.json())
          .then(json => {
              let artist = json.artists.items[0];
              this.setState({artist});

              FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;

              fetch(FETCH_URL, myOptions)
                .then(response => response.json())
                .then(json => {
                    console.log('artists top tracks:', json);
                    const tracks = json.tracks;
                    this.setState({tracks});
                })
          })
      }

    componentDidMount() {
        let parsed = queryString.parse(window.location.search);
        let accessToken = parsed.access_token;
        console.log(accessToken);
        this.setState({accessToken: accessToken});
    }

    render () {
        return (
            <div className="App">
            <div className="intro">
                <p className="script"><span>Welcome to Richard's</span></p>
                <p className="shadow text1">SPOTIFY</p>
                <p className="shadow text2">MUSIC</p>
                <p className="shadow text3">PLAYER</p>
                <p className="script"></p>
            </div>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            className="searchBar"
                            type="text"
                            placeholder="Search for an artist"
                            value={this.state.query}
                            onChange={event => {this.setState({query: event.target.value})}}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    this.search();
                                }
                            }}
                        />
                        <InputGroup.Addon onClick={() => this.search()}>
                            <Glyphicon glyph="search"></Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                    </FormGroup>
                    {
                    this.state.artist !== null 
                    ? <div>
                        <Profile 
                            artist={this.state.artist}
                        />
                        <Gallery
                            tracks={this.state.tracks}
                        />
                    </div>
                    : <div></div>
                    }
                </div>
        )
    }
}
export default App;