import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gotLyrics } from './store/index';
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
      search: 'Search Term',
      artist: 'Lyric',
      name: 'Artist',
      other: ['Other Songs'],
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
        : (others = ['other songs']);
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
      document.getElementById('interim').value = interimTranscript;
      // document.getElementById('lyrics').value = this.state.lyrics;
      // document.getElementById('name').value = this.state.name;
      // document.getElementById('artist').value = this.state.artist;

      const transcriptArr = finalTranscript.split(' ');
      const stopCmd = transcriptArr.slice(-3, -1);
      console.log('stopCmd', stopCmd);

      if (stopCmd[0] === 'stop' && stopCmd[1] === 'listening') {
        recognition.stop();
        recognition.onend = () => {
          console.log('stopped cuz command');
          const finalText = transcriptArr.slice(0, -3).join(' ');
          // document.getElementById('final').innerHTML = this.state.lyrics;
        };
      } else {
        console.log(finalTranscript);

        document.getElementById('background').style = `background-color:${
          stopCmd[0]
        }`;
        // finalTranscript = '';
      }
    };

    recognition.onerror = event => {
      console.log('Error occurred in recognition: ' + event.error);
    };
  }

  render() {
    // console.log('just set final state search', this.state);
    // this.setState({ search: finalTranscript });
    // const { lyrics } = this.props;
    // console.log('this is lyrivs', lyrics);
    // if (this.props.lyrics.rows) {
    //   let check = lyrics.rows[0].name;
    //   console.log('lyrics.rows[0][name] = ', check);
    // }
    return (
      <div id="background">
        <button type="button" id="microphone-btn" onClick={this.toggleListen}>
          RECORD
        </button>
        <textarea id="interim">Search</textarea>
        <textarea
          id="artist"
          rows="20"
          cols="50"
          wrap="hard"
          value={this.state.artist}
        />
        <textarea
          id="name"
          rows="2"
          cols="12"
          wrap="hard"
          value={this.state.name}
        />
        <textarea
          id="lyrics"
          rows="2"
          cols="20"
          wrap="hard"
          value={this.state.lyrics}
        />
        {this.state.search ? (
          <ul id="othersongs" columns="20" rows="30">
            {' '}
            Other Songs that feature: {this.state.search}{' '}
          </ul>
        ) : (
          <ul> Other Songs </ul>
        )}
        {this.state.other.length > 1 ? (
          this.state.other.map(elem => {
            return <li key={elem}>{elem}</li>;
          })
        ) : (
          <li />
        )}
        <button type="button" id="search-btn" onClick={this.handleSearch}>
          SEARCH
        </button>
      </div>
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
