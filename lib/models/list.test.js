const List = require('./list');
const pool = require('../utils/pool');
const fs = require('fs');

describe('List Model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  it('should insert a new list into the database', async() => {
    const createdList = await List.insert({
      name: 'clean dishes',
      type: 'chores',
      priority: 10,
      complete: false
    });

    const { rows } = await pool.query('SELECT * FROM lists WHERE id = $1', [createdList.id]);
    expect(rows[0]).toEqual(createdList);
  });
});
