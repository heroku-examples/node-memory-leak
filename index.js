const http = require('http');
const dummyjson = require('dummy-json');

const leaks = [];

function leakyServer(req, res) {
  const response = dummyjson.parse(`
    {
      "id": {{int 1000 9999}},
      "name": "{{firstName}} {{lastName}}",
      "work": "{{company}}",
      "email": "{{email}}"
    }
  `);
  leaks.push(JSON.parse(response));
  res.end(response);
}

const server = http.createServer(leakyServer)
  .listen(process.env.PORT || 3000);
