const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

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
});
