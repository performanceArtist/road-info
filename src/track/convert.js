const fs = require('fs');

const removeDots = item => {
  return (
    100 *
    parseFloat(
      `0.${Array.from(item.toString())
        .filter(el => el !== '.')
        .join('')}`
    )
  );
};

const coordFilter = data =>
  data.reduce((acc, cur) => {
    const hasItem = acc.find(
      item => item.latitude === cur.latitude || item.longitude === cur.longitude
    );
    if (!hasItem) acc.push(cur);
    return acc;
  }, []);

fs.readFile(process.argv[2], (err, data) => {
  const json = JSON.parse(data);
  const result = json.map(({ latitude, longitude }) => ({
    latitude: removeDots(latitude),
    longitude: removeDots(longitude)
  }));
  fs.writeFile('result.json', JSON.stringify(coordFilter(result)), () => {});
});
