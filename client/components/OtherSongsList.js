import React from 'react';
import { Segment, List, Label } from 'semantic-ui-react';

const OtherSongsList = props => {
  const others = props.others || [];
  const search = props.search;
  const links = props.links || [];
  return (
    <Segment raised>
      <Label color="teal">Other songs that feature: "{search}"</Label>
      <List divided verticalAlign="middle">
        {others.map((song, index) => {
          let linky = 'http://www.lyricsfreak.com' + links[index];
          return (
            <List.Item key={song}>
              <List.Content>
                <a href={linky}>{song}</a>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    </Segment>
  );
};

export default OtherSongsList;
