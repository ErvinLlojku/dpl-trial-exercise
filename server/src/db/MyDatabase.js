const { SQLDataSource } = require("datasource-sql");
class MyDatabase extends SQLDataSource {
  /**
   * This method is used to query user table and return `birthday`
   *
   * @returns
   */
  getBirthday() {
    return this.knex
      .select("birthday")
      .from("user")
      .where({ id: 1 })
      .first()
      .cache();
  }

  setBirthday(birthday) {
    return this.knex('user')
      .where('id', 1)
      .update({
        birthday: birthday,
      });
  }
}

module.exports = MyDatabase;
