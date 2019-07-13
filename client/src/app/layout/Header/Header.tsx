import React from 'react';

interface Props {
  title?: string;
}

const Header = ({ title = 'Title' }: Props) => {
  return (
    <header className="header">
      <h1 className="header__title">{title}</h1>
    </header>
  );
};

export default Header;
