const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const List = require('../lib/models/list');

describe('To Do List routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a new list via POST', async() => {
    const response = await request(app)
      .post('/api/v1/lists')
      .send({
        id: expect.any(Number),
        name: 'clean dishes',
        type: 'chore',
        priority: 10,
        complete: false
      });
    
    expect(response.body).toEqual({
      id: expect.any(Number),
      name: 'clean dishes',
      type: 'chore',
      priority: 10,
      complete: false
    });
  });

  it('reads list by id via GET', async() => {
    const newList = await List.insert({
      name: 'clean dishes',
      type: 'chore',
      priority: 10,
      complete: false
    });

    const response = await request(app)
      .get(`/api/v1/lists/${newList.id}`);

    expect(response.body).toEqual({
      id: newList.id,
      name: 'clean dishes',
      type: 'chore',
      priority: 10,
      complete: false
    });
  });

  it('updates a list by id via PATCH', async() => {
    const listItem = await List.insert({
      name: 'dishes',
      type: 'chore',
      priority: 10,
      complete: false
    });

    const updatedList = {
      name: 'do dishes',
      type: 'chore',
      priority: 6,
      complete: true
    };

    const response = await request(app)
      .patch(`/api/v1/lists/${listItem.id}`)
      .send(updatedList);

    expect(response.body).toEqual({
      id: listItem.id,
      name: 'do dishes',
      type: 'chore',
      priority: 6,
      complete: true
    });
  });

  it('deletes a list by id via DELETE', async() => {
    const createdList = await List.insert({
      name: 'dishes',
      type: 'chore',
      priority: 6,
      complete: true
    });

    const response = await request(app)
      .delete(`/api/v1/lists/${createdList.id}`);

    expect(response.body).toEqual({
      id: createdList.id,
      name: 'dishes',
      type: 'chore',
      priority: 6,
      complete: true
    });
  });

});
