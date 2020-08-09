module.exports = {
  success: (res, data = null) => {
    const response = {
      status: 200,
      data
    };

    return res.status(200).send(response);
  },
  error: (res, status = 500) => {
    const response = {
      status
    };
  
    return res.status(status).send(response);
  }
};