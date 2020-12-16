const fs = require('fs');

const version = Date.now();
let body = {
  version
};

console.log(`New build version: ${version}`);
let data = JSON.stringify(body, null, 2);

fs.writeFileSync('./buildinfo.json', data, err => {
  if (err) throw err;
});
