class Billing {
  constructor(id, userId, categoryId, price, description, createdDate, updatedDate) {
    this.id = id;
    this.userId = userId;
    this.categoryId = categoryId;
    this.price = price;
    this.description = description;
    this.createdDate = createdDate;
    this.updatedDate =updatedDate;
  }
}

module.exports = Billing;