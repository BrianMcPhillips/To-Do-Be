const pool = require('../utils/pool');

class List {
  id;
  name;
  type;
  priority;
  complete;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.priority = row.priority;
    this.complete = row.complete;
  }

  static async insert(list) {
    const { rows } = await pool.query('INSERT INTO lists (name, type, priority, complete) VALUES($1, $2, $3, $4) RETURNING *',
      [list.name, list.type, list.priority, list.complete]);

    return new List(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM lists WHERE id = $1', [id]
    );

    return new List(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM lists'
    );

    return rows.map(row => new List(row));
  }

  static async update(id, updatedList) {
    const { rows } = await pool.query(
      `UPDATE lists SET
      name = $1,
      type = $2,
      priority = $3,
      complete = $4
      WHERE id = $5 RETURNING *`, [updatedList.name, updatedList.type, updatedList.priority, updatedList.complete, id]
    );

    return new List(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM lists WHERE id = $1 RETURNING *',
      [id]
    );

    return new List(rows[0]);
  }

}

module.exports = List;
