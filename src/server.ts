import * as express from 'express';
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const socketIO = require('socket.io');
const path = require('path');
// bigint type workaround, otherwise it returns as a string
const pg = require('pg');
pg.types.setTypeParser(20, parseInt);

import loginRouter from './routes/login';
import appRouter from './routes/app';
import apiRouter from './routes/api';
import adminRouter from './routes/admin';

const app = express();

app.use(cors());
//app.use(morgan('tiny'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// public routes
app.use(loginRouter);

// protected routes - auth check
app.use(appRouter);
app.use(apiRouter);

// admin pages - check privilege level
app.use(adminRouter);

app.get('*', (req, res) => {
  res.status(404).send('<h1>Not Found</h1>');
});

app.use(
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log(error);
    res
      .status(error.statusCode || error.status || 500)
      .json({ error: error.message || {} });
  }
);

const server = app.listen(5000, () => console.log('Listening on port 5000!'));

export const io = socketIO(server);

io.on('connection', (socket: any) => {
  console.log('Connection opened');
});
