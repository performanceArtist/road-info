import * as React from 'react';
import { NavLink } from 'react-router-dom';

enum Icon {
  NONE = '',
  HOME = 'images/home.png',
  GRAPH = 'images/measurements.png',
  HISTORY = 'images/history.png',
  OPTIONS = 'images/options.png',
  DIAGNOSTICS = 'images/diagnostics.png',
  TRUCK = 'images/truck.png',
  REPORT = 'images/report.png',
  TASK = 'images/task.png'
}

interface Link {
  path: string;
  title?: string;
  icon?: Icon;
}

type Props = {
  links: Array<Link>;
};

const Navigation: React.FC<Props> = ({ links }) => {
  const elements = links.map(({ path, icon = Icon.NONE, title = '' }: Link) => (
    <NavLink
      exact
      key={path}
      className="navigation__link"
      to={path}
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
