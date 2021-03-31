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

}

module.exports = List;
