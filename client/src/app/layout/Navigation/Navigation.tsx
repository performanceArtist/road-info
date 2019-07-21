import React from 'react';
import uuid from 'short-uuid';
import { NavLink } from 'react-router-dom';

enum Icon {
  NONE = '',
  HOME = 'images/home.png',
  GRAPH = 'images/graph.png',
  HISTORY = 'images/history.png',
  OPTIONS = 'images/options.png',
  DIAGNOSTICS = 'images/diagnostics.png',
  TRUCK = 'images/truck.png'
}

interface Link {
  url: string;
  title?: string;
  icon?: Icon;
}

type Props = {
  links: Array<Link>;
};

const Navigation: React.FC<Props> = ({ links }) => {
  const elements = links.map(({ url, icon = Icon.NONE, title = '' }: Link) => (
    <NavLink
      exact
      key={uuid.generate()}
      className="navigation__link"
      to={url}
      activeClassName="navigation__link navigation__link_selected"
    >
      <span
        className="navigation__icon"
        style={{
          backgroundImage: `url(${icon})`,
          display: icon === Icon.NONE ? 'none' : ''
        }}
      />
      <span className="navigation__title">{title}</span>
    </NavLink>
  ));

  return (
    <nav className="navigation">
      <div className="navigation__wrapper">{elements}</div>
    </nav>
  );
};

export { Navigation, Icon };
