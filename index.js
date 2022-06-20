const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const { talker, login } = require('./routes/index');
const middleware = require('./middlewares/index');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', rescue(talker.router));
app.use('/login', rescue(login.router));
app.use(middleware.errorMiddleware);

app.listen(PORT, () => {
  console.log('Online');
});
