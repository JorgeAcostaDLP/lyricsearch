import React from 'react';
import { Label } from 'semantic-ui-react';

const SearchLabel = props => {
  const search = props.search.toUpperCase() || 'SEARCH';

  return (
    <Label as="a" color="red" ribbon>
      {search}
    </Label>
  );
};

export default SearchLabel;
