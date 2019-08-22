import * as React from 'react';
import { useState } from 'react';
import L from 'leaflet';
import { Popup } from 'react-leaflet';

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

  const renderTable = () => {
    return data[tripIndex].map(({ name, value, difference }) => {
      const diffString =
        difference > 0 ? '+' + difference.toFixed(2) : difference.toFixed(2);

      return (
        <div className="map-popup__row">
          <span className="map-popup__row-name">{name}:</span>
          <span className="map-popup__numbers">
            {value.toFixed(2)}(
            <span className="map-popup__difference">{diffString}</span>)
          </span>
        </div>
      );
    });
  };

  return (
    <Popup className="map-popup" position={position}>
      <div className="map-popup__wrapper">
        {data.length === 0 ? 'Параметры в норме' : renderSelect()}
        {data.length !== 0 && renderTable()}
      </div>
    </Popup>
  );
};

export default MapPopup;
