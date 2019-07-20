import { MapLayer } from 'react-leaflet';
import L from 'leaflet';
import { withLeaflet } from 'react-leaflet';
import 'leaflet-routing-machine/src';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

class RoutingMachine extends MapLayer {
  createLeafletElement() {
    const { color, map, road } = this.props;

    let leafletElement = L.Routing.control({
      waypoints: road,
      lineOptions: {
        styles: [
          [
            { color: 'black', opacity: 0.15, weight: 9 },
            { color: 'white', opacity: 0.8, weight: 6 },
            { color: 'green', opacity: 1, weight: 2 }
          ]
        ]
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      showAlternatives: false,
      altLineOptions: { styles: [{ opacity: 0 }] },
      createMarker: () => {
        return null;
      }
    }).addTo(map.current.leafletElement);

    leafletElement.hide(); // hide road describtion

    return leafletElement.getPlan();
  }
}

export default withLeaflet(RoutingMachine);
