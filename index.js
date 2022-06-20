const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const routes = require('./routes/talkerRouter');
const middleware = require('./middlewares/index');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  console.log('aqui');
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', rescue(routes.talkerRouter));
app.use(middleware.errorMiddleware);

app.listen(PORT, () => {
  console.log('Online');
});
