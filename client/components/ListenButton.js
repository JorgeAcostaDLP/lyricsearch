import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gotLyrics } from './store/index';
import { Label, Header, Button, Container, Segment } from 'semantic-ui-react';
import SearchLabel from './SearchLabel';
import SongItem from './SongItem';
import OtherSongsList from './OtherSongsList';
const SpeechRecognition = window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';

class ListenButton extends Component {
  constructor() {
    super();
    this.state = {
      listening: false,
      lyrics: '',
      artist: '',
      name: '',
      search: '',
      other: [],
    };
    this.toggleListen = this.toggleListen.bind(this);
    this.handleListen = this.handleListen.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    this.setState({
      lyrics: 'Song Name',
      search: 'the search term',
      artist: 'Lyric',
      name: 'Artist',
      other: [''],
    });
  }
  toggleListen() {
    this.setState(
      (state, props) => ({
        listening: !state.listening,
      }),
      this.handleListen
    );
  }

  handleSearch() {
    this.props.gotLyrics(this.state.search);

    if (this.props.lyrics.rows.length) {
      let check = this.props.lyrics.rows[0].lyrics;
      console.log('lyrics.rows[0][name] = ', check);
      let others = [];
      this.props.lyrics.rows
        ? this.props.lyrics.rows.map(elem => others.push(elem.name))
        : (others = ['']);
      this.setState({
        lyrics: this.props.lyrics.rows[0].artist,
        name: this.props.lyrics.rows[0].name,
        artist: this.props.lyrics.rows[0].lyrics,
        other: others,
      });
    } else {
      this.setState({
        lyrics: 'song',
        name: 'artist',
        artist: 'lyric',
      });
    }
  }

  handleListen() {
    console.log('listening?', this.state.listening);

    if (this.state.listening) {
      recognition.start();
      recognition.onend = () => {
        console.log('...continue listening...');
        recognition.start();
      };
    } else {
      recognition.stop();
      recognition.onend = () => {
        console.log('Stopped listening per click');
      };
    }
    recognition.onstart = () => {
      console.log('Listening');
    };
    // let finalTranscript = '';
    recognition.onresult = event => {
      let interimTranscript = '';
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
          this.setState({ search: finalTranscript });
        } else {
          interimTranscript += transcript;
        }
      }
      document.getElementById('search').value = interimTranscript;

      const transcriptArr = finalTranscript.split(' ');
      const stopCmd = transcriptArr.slice(-3, -1);
      console.log('stopCmd', stopCmd);

      if (stopCmd[0] === 'stop' && stopCmd[1] === 'listening') {
        recognition.stop();
        recognition.onend = () => {
          console.log('stopped cuz command');
          const finalText = transcriptArr.slice(0, -3).join(' ');
        };
      } else {
        console.log(finalTranscript);

        document.getElementById('background').style = `background-color:${
          stopCmd[0]
        }`;
        finalTranscript = '';
      }
    };

    recognition.onerror = event => {
      console.log('Error occurred in recognition: ' + event.error);
    };
  }

  render() {
    return (
      <Segment padded raised inverted floating>
        <Header inverted-color="red">WELCOME TO LYRIC SEARCH</Header>
        <Button primary id="microphone-btn" onClick={this.toggleListen}>
          SPEAK
        </Button>
        <Button primary id="search-btn" onClick={this.handleSearch}>
          SEARCH
        </Button>
        <Segment raised>
          <SearchLabel search={this.state.search} />
          {/* <textarea id="search">Search</textarea> */}
          <SongItem
            artist={this.state.artist}
            name={this.state.lyrics}
            lyrics={this.state.name}
          />
        </Segment>
        {this.state.search !== 'the search term' ? (
          <OtherSongsList
            search={this.state.search}
            others={this.state.other}
          />
        ) : (
          <Label color="red">Speak into the app to search for lyrics</Label>
        )}
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    lyrics: state,
  };
};

const mapDispatchToProps = dispatch => ({
  gotLyrics: lyr => dispatch(gotLyrics(lyr)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListenButton);
