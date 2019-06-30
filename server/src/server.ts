import express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

import loginRouter from './routes/public';
import appRouter from './routes/private';
import adminRouter from './routes/admin';

const app = express();

app.use(cors());
//app.use(morgan('tiny'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// public routes
app.use(loginRouter);

// protected routes - auth check
app.use(appRouter);

// admin pages - check privilege level
app.use(adminRouter);

app.get('*', (req, res) => {
  res.status(404).send('<h1>Not Found</h1>');
});

app.listen(5000, () => console.log('Listening on port 5000!'));
