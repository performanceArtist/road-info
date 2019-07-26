import React, { useState, useEffect } from 'react';

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

  /*  
  useEffect(() => {
    const { x, y } = coords;
    const element = ref.current as HTMLElement;
    setCoords({
      x: x,
      y: y - 56
    });
  }, []);
*/
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
