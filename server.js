const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const DATA_FILE = path.join(__dirname, 'data.json');

app.set('port', (process.env.PORT || 30003));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/todos', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/api/todos/new', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const storage = JSON.parse(data);
    storage.time = req.body.time;

    fs.writeFile(DATA_FILE, JSON.stringify(storage, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json({});
      res.end();
    });
  });
});

app.post('/api/todos', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const storage = JSON.parse(data);
    storage.time = req.body.time;
    storage.data.push(req.body.item);

    fs.writeFile(DATA_FILE, JSON.stringify(storage, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json({});
      res.end();
    });
  });
});

app.delete('/api/todos', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const storage = JSON.parse(data);
    storage.data = storage.data.reduce((memo, item) => {
      if (item.id === req.body.id) {
        return memo;
      } else {
        return memo.concat(item);
      }
    }, []);

    fs.writeFile(DATA_FILE, JSON.stringify(storage, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json({});
      res.end();
    });
  });
});

app.put('/api/todos', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const storage = JSON.parse(data);
    storage.data.forEach(item => {
      if (item.id === req.body.id) {
        if (item.isReady !== req.body.isReady) {
          item.isReady = req.body.isReady;
        }
        if (item.text !== req.body.text) {
          item.text = req.body.text;
        }
      }
    });

    fs.writeFile(DATA_FILE, JSON.stringify(storage, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json({});
      res.end();
    });
  })
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});