import React from 'react';
import { Label } from 'semantic-ui-react';
// import {Link} from 'react-router-dom'

const SearchLabel = props => {
  const search = props.search || 'search';

  return (
    <Label as="a" color="red" ribbon>
      {search}
    </Label>
  );
};

export default SearchLabel;
