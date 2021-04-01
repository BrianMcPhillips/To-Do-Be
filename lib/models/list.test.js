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

  it('finds a list by id', async() => {
    const dishes = await List.insert({
      name: 'dishes',
      type: 'chore',
      priority: 10,
      complete: false
    });
    const foundList = await List.findById(dishes.id);

    expect(foundList).toEqual({
      id: dishes.id,
      name: 'dishes',
      type: 'chore',
      priority: 10,
      complete: false
    });
  });

  it('finds all lists', async() => {
    await Promise.all([
      List.insert({
        name: 'dishes',
        type: 'chore',
        priority: 10,
        complete: false
      }),
      List.insert({
        name: 'clean floor',
        type: 'chore',
        priority: 7,
        complete: false
      }),
      List.insert({
        name: 'run on treadmill',
        type: 'exercise',
        priority: 5,
        complete: false
      })
    ]);

    const lists = await List.find();

    expect(lists).toEqual(expect.arrayContaining([
      { id: expect.any(Number), name: 'dishes', type: 'chore', priority: 10, complete: false },
      { id: expect.any(Number), name: 'clean floor', type: 'chore', priority: 7, complete: false },
      { id: expect.any(Number), name: 'run on treadmill', type: 'exercise', priority: 5, complete: false }
    ]));
  });

  it('updates a row by id', async() => {
    const createdList = await List.insert({
      name: 'dishes',
      type: 'chore',
      priority: 7,
      complete: false
    });

    const updatedListItem = await List.update(createdList.id, {
      name: 'do dishes',
      type: 'chore',
      priority: 10,
      complete: true
    });

    expect(updatedListItem).toEqual({
      id: createdList.id,
      name: 'do dishes',
      type: 'chore',
      priority: 10,
      complete: true
    });
  });

  it('deletes a row by id', async() => {
    const createdList = await List.insert({
      name: 'do dishes',
      type: 'chore',
      priority: 10,
      complete: true
    });

    const deletedList = await List.delete(createdList.id);

    expect(deletedList).toEqual({
      id: createdList.id,
      name: 'do dishes',
      type: 'chore',
      priority: 10,
      complete: true
    });
  });
});
