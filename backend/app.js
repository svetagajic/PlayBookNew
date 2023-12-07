const express = require('express');
const bodyParser = require('body-parser');
const playbooksRouter = require('./routes/playbooks');
const { sequelize } = require('./models');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Routes
app.use('/playbooks', playbooksRouter);

// Sync the Sequelize models with the database and start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
