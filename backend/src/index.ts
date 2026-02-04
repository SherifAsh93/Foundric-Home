import express from 'express';

const app = express();
const port = 3000;
app.get('/', (req, res) => {
    // instead of this res.send('Hello World!'); I need to have a message with endpoints to owners, customer and admin
  res.json({
    message: 'Welcome to the Foundric API',
    endpoints: {
      owners: '/api/owners',
      customers: '/api/customers',
      admin: '/api/admin'
    }
  });
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});