const https = require('https');

const ids = [
  'm2nR8E1W-cQ',
  'ARxlarNq5Dk',
  '-mh3UHYfTow',
  'I3KqGtY3Hbk',
  'J99P5NVyjyc',
  'b213XARRlMA'
];

Promise.all(ids.map(id => {
  return new Promise((resolve) => {
    https.get(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ id, title: json.title });
        } catch (e) {
          resolve({ id, title: 'Unknown Title (Unlisted/Private restriction)' });
        }
      });
    }).on('error', () => resolve({ id, title: 'Network error' }));
  });
})).then(results => console.log(JSON.stringify(results, null, 2)));
