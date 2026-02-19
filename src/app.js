import express from 'express';

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import indexRouter from './routes/indexRouter.js'
import newMessageRouter from './routes/newMessageRouter.js'
import messageRouter from './routes/messageRouter.js'

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouter)
app.use('/new', newMessageRouter)
app.use('/message', messageRouter)

app.use((req, res) => {
  res.send('404 error')
})

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Mini Message Board app - listening on port ${PORT}!`);
});