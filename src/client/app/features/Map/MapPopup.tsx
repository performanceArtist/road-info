import * as React from 'react';
import { useState } from 'react';
import L from 'leaflet';
import { Popup } from 'react-leaflet';

import MiniTable from '@components/MiniTable/MiniTable';

export type PointData = Array<{
  key: string;
  value: number;
  name: string;
  difference: number;
}>;

type Props = {
  position: L.LatLng;
  data: Array<PointData>;
};

const MapPopup: React.FC<Props> = ({ position, data }) => {
  const [tripIndex, setTripIndex] = useState(0);

  const renderSelect = () => {
    if (data.length === 1)
      return <div className="map-popup__select">Отклонения ( Заезд 1 )</div>;

    const options = data.map((el, index) => (
      <option value={index}>{`Заезд ${index + 1}`}</option>
    ));

    return (
      <>
        {'Отклонения('}
        <select
          name="trip"
          className="map-popup__select"
          value={tripIndex}
          onChange={event => setTripIndex(parseInt(event.target.value, 10))}
        >
          {options}
        </select>
        {')'}
      </>
    );
  };

  return (
    <Popup className="map-popup" position={position}>
      <div className="map-popup__wrapper">
        {data.length === 0 ? 'Параметры в норме' : renderSelect()}
        {data.length !== 0 && <MiniTable diffs={data[tripIndex]} />}
      </div>
    </Popup>
  );
};

export default MapPopup;
