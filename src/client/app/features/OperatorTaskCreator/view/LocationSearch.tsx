import React, { useState } from 'react';

import { Input, Button } from '@shared/view';

interface OwnProps {
  onSubmit(search: string): void;
}

const LocationSearch: React.FC<OwnProps> = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  return (
    <div className="location-search">
      <div className="location-search__input">
        <Input
          value={search}
          onChange={event => setSearch(event.target.value)}
        />
      </div>
      <Button onClick={() => onSubmit(search)}>Поиск</Button>
    </div>
  );
};

export default LocationSearch;
