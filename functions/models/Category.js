class Category {
  constructor(id, title, description, status, createdDate, updatedDate) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdDate = createdDate;
    this.updatedDate =updatedDate;
  }
}

module.exports = Category;