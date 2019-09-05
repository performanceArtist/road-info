import { MeasurementData } from '@redux/measurements/types';

function pointDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const p = 0.017453292519943295;
  const a =
    0.5 -
    Math.cos((lat2 - lat1) * p) / 2 +
    (Math.cos(lat1 * p) *
      Math.cos(lat2 * p) *
      (1 - Math.cos((lon2 - lon1) * p))) /
      2;
  return 12742 * Math.asin(Math.sqrt(a));
}

export function haversine(
  list: Array<MeasurementData>,
  point: { latitude: number; longitude: number }
) {
  const res = list.map(p =>
    pointDistance(point.latitude, point.longitude, p.latitude, p.longitude)
  );

  const index = res.indexOf(Math.min(...res));
  return index;
}

const RDP = (l, eps) => {
  const last = l.length - 1;
  const p1 = l[0];
  const p2 = l[last];
  const x21 = p2.latitude - p1.latitude;
  const y21 = p2.longitude - p1.longitude;

  const [dMax, x] = l
    .slice(1, last)
    .map(p =>
      Math.abs(
        y21 * p.latitude -
          x21 * p.longitude +
          p2.latitude * p1.longitude -
          p2.longitude * p1.latitude
      )
    )
    .reduce(
      (p, c, i) => {
        const v = Math.max(p[0], c);
        return [v, v === p[0] ? p[1] : i + 1];
      },
      [-1, 0]
    );

  if (dMax > eps) {
    return [...RDP(l.slice(0, x + 1), eps), ...RDP(l.slice(x), eps).slice(1)];
  }
  return [l[0], l[last]];
};

const coordFilter = data =>
  data.reduce((acc, cur) => {
    const hasItem = acc.find(
      item => item.latitude === cur.latitude || item.longitude === cur.longitude
    );
    if (!hasItem) acc.push(cur);
    return acc;
  }, []);
