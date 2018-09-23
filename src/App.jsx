import React, { Component } from 'react';
import './App.css';

class App extends Component {
    render () {
        return (
            <div className="App">
                <div className="App-title">Richard's Spotify Music Player</div>
                <div>
                    <input placeholder="search for an artist..."/>
                    <button>Submit</button>
                </div>
                <div className="Profile">
                    <div>Artist Picture</div>
                    <div>Artist Name</div>
                </div>
                <div className="Gallery">
                    Gallery
                </div>
            </div>
        )
    }
}

export default App;