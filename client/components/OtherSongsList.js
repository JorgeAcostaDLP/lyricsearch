import React from 'react';
import { Segment, List, Label } from 'semantic-ui-react';

const OtherSongsList = props => {
  const others = props.others || [];
  const search = props.search;

  return (
    <Segment raised>
      <Label color="teal">Other songs that feature: "{search}"</Label>
      <List divided verticalAlign="middle">
        {others.map(song => {
          return (
            <List.Item key={song}>
              <List.Content>{song}</List.Content>
            </List.Item>
          );
        })}
      </List>
    </Segment>
  );
};

export default OtherSongsList;
