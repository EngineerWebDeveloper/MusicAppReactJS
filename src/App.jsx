import React, { Component } from "react";
import "./App.css";
import { FormGroup, FormControl, InputGroup, Glyphicon } from "react-bootstrap";
import Profile from "./Profile";
import Gallery from "./Gallery";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }
  callTrack(id) {
    let FETCH_URL = `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`;
    var accessToken =
      "BQAGb8oxcvrJVH3OBfkvMpq2AfTLwy0gOb7wEL8Arx4_DfqBgQqo_VYnukhVEUQahXKvQ5FvbOR7gbgnJCDRiko_m2OwvGPVCIpXZwFX0Svj6a6X7EDwEJtRZBnzcTOcGeEsPhxHj6TH64RC-EKTz8wUyL8aaAYJT9VV76iHejewYfw0COmH&refresh_token=AQAodz3o1VIArXNCGRtzNiFScNKS6NB3gPo2KnGTd-Tmjj0lHQkC4PplmCPGegCgxpgkpy-jWh9-AYIgSdAPDipl136aejz8pADR0A1LaagFnIRCu0rqK4-ad8YS958ECckurQ";
    fetch(FETCH_URL, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
        Accept: "application/json"
      },

      mode: "cors",
      cache: "default"
    })
      .then(resp => {
        return resp.json();
      })
      .then(json => {
        const tracks = json;
        this.setState({ tracks });
      });
  }
  search() {
    const BASE_URL = "https://api.spotify.com/v1/search?";
    let FETCH_URL = BASE_URL + "q=" + this.state.query + "&type=artist&limit=1";
    var accessToken =
      "BQAGb8oxcvrJVH3OBfkvMpq2AfTLwy0gOb7wEL8Arx4_DfqBgQqo_VYnukhVEUQahXKvQ5FvbOR7gbgnJCDRiko_m2OwvGPVCIpXZwFX0Svj6a6X7EDwEJtRZBnzcTOcGeEsPhxHj6TH64RC-EKTz8wUyL8aaAYJT9VV76iHejewYfw0COmH&refresh_token=AQAodz3o1VIArXNCGRtzNiFScNKS6NB3gPo2KnGTd-Tmjj0lHQkC4PplmCPGegCgxpgkpy-jWh9-AYIgSdAPDipl136aejz8pADR0A1LaagFnIRCu0rqK4-ad8YS958ECckurQ";

    var myOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      },
      mode: "cors",
      cache: "default"
    };

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];
        this.callTrack(artist.id);
        this.setState({ artist });
      });
  }
  render() {
    return (
      <div className="App">
        <div className="App-title">Music Master</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="search for an Artist"
              value={this.state.query}
              onChange={event => {
                this.setState({ query: event.target.value });
              }}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.search();
                }
              }}
            />
            <InputGroup.Addon>
              <Glyphicon glyph="search" onClick={() => this.search()} />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {this.state.artist ? (
          <div>
            <Profile artist={this.state.artist} />
            <Gallery tracks={this.state.tracks || []} />
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}
export default App;
