import React from 'react';

interface HeaderProps {
  title?: string;
}

const Header = ({ title = 'Title' }: HeaderProps) => {
  return (
    <header className="header">
      <h1 className="header__title">{title}</h1>
    </header>
  );
};

export default Header;
