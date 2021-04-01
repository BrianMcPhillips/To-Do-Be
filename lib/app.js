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

app.get('/api/v1/lists/', async(req, res, next) => {
  try {
    const createdLists = await List.find(req);
    res.send(createdLists);
  } catch(error) {
    next(error);
  }
});

app.patch('/api/v1/lists/:id', async(req, res, next) => {
  try {
    const updatedList = await List.update(req.params.id, req.body);
    res.send(updatedList);
  } catch(error) {
    next(error);
  }
});

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
