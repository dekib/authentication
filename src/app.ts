import express from 'express';
// import helmet from 'helmet'; // third party app but very useful
import { createServer } from 'http';
import CONFIG from './config';
import v1 from './routes/api';

const app = express();

// app.use(helmet.xssFilter());
//
// app.use(helmet.frameguard({
//   action: 'deny'
// }));
//
// app.use(helmet.noSniff());
// app.use(helmet.hidePoweredBy());

app.use(v1);

const server = createServer(app);

server.listen(+CONFIG.PORT, () => {
  // todo add logger('Listen on port: ', +CONFIG.PORT);
});

server.timeout = 100000;

export default app;
