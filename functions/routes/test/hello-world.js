module.exports = app => {
  app.get('/hello-world', (req, res) => {
    return res.status(200).send('Hello World!');
  });
}