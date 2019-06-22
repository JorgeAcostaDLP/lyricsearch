import React from 'react';
import { Card, Item } from 'semantic-ui-react';

const SongItem = props => {
  const name = props.name || 'Song Name';
  const artist = props.artist || 'Artist';
  const lyrics = props.lyrics || 'Lyrics';
  return (
    <Card fluid>
      <Item>
        <Item.Content>
          <Item.Header as="a">
            {lyrics}
            <Item.Meta>{name}</Item.Meta>
          </Item.Header>
          <Item.Description>{artist}</Item.Description>
        </Item.Content>
      </Item>
    </Card>
  );
};

export default SongItem;
