const https = require('https');

https.get('https://mixkit.co/free-stock-video/cinematography/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/https:\/\/assets\.mixkit\.co\/videos\/preview\/mixkit-[^"']+\.mp4/gi);
    if (match && match.length > 0) {
      console.log('Found video URL:', match[0]);
    } else {
      console.log('No video URL found. Try searching for "camera" or "film".');
    }
  });
}).on('error', err => {
  console.error(err);
});
