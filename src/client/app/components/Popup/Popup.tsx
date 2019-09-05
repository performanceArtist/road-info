import * as React from 'react';
import { useState } from 'react';

type Props = {
  coordinates: { x: number; y: number };
  error?: boolean;
  children?: JSX.Element | JSX.Element[] | string;
};

const Popup: React.FC<Props> = ({
  coordinates,
  children = null,
  error = false
}) => {
  const [coords, setCoords] = useState(coordinates);
  const ref = React.createRef();

  return (
    <div
      ref={ref}
      className={error ? 'popup popup_error' : 'popup'}
      style={{ left: coordinates.x, top: coordinates.y }}
    >
      <div className="popup__content">{children}</div>
    </div>
  );
};

export default Popup;
