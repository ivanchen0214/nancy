class User {
  constructor(id, firstName, lastName, createdDate, updatedDate) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.createdDate = createdDate;
    this.updatedDate =updatedDate;
  }
}

module.exports = User;