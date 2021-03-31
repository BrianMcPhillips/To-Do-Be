const express = require('express');
const List = require('./models/list');
const app = express();

app.use(express.json());

app.post('/api/v1/lists', async(req, res, next) => {
  try {
    const createdList = await List.insert(req.body);
    res.send(createdList);
  } catch(error) {
    next(error);
  }
});

app.get('/api/v1/lists/:id', async(req, res, next) => {
  try {
    const foundList = await List.findById(req.params.id);
    res.send(foundList);
  } catch(error) {
    next(error);
  }
});

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
