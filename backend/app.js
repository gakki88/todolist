const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const itemsRouter = require('./routes/items');
const usersRouter = require('./routes/users');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(
  "mongodb+srv://zoe:<password>@cluster0-xynrh.mongodb.net/todolist?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true  }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use('/list', itemsRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});