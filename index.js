const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , app = express();

/* Middlewares */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

let now = new Date
const sensors = [
  {
    'id': 1234,
    'date': (now.getDate() + "/" + now.getMonth() + "/" + now.getFullYear() + "-" + now.toLocaleTimeString()),
    'type': 'Umidade do solo',
    'value': 25,
  },
  {
    'id': 4321,
    'date': now.getDate(),
    'type': 'temperature',
    'value': 25,
  }
];

/* Routes */
app.get('/sensors', (req, res) => res.json(sensors));

app.get('/sensors/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const sensor = sensors.filter((item) => item.id === id);

  if (sensor.length <= 0) {
    return res.json({});
  }
  return res.json(sensor[0]);
});

app.post('/sensors', (req, res) => {
  const sensor = {
    'id': req.body.id,
    'date': (new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() + "-" + new Date().toLocaleTimeString()),
    'type': 'Umidade do solo',
    'value': req.body.value,
  };
  sensors.push(sensor);

  res.json(sensor);
});

/* App listen */
app.listen(3000, () => {
  console.log(`nodejs-backend is running`);
  console.log(`open in http://127.0.0.1:3000/sensors`);
});
