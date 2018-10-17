import Koa from 'koa';
import logger from 'koa-logger';
import KoaRouter from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

const config = {
  apiKey: process.env.IGDB_USER_KEY,
  port: process.env.PORT || 3000,
};

const app = new Koa();

app.use(logger());
app.use(cors());
app.use(bodyParser());

var router = new KoaRouter();

app.use(router.allowedMethods());
app.use(router.routes());

app.listen(config.port, () => {
  console.log(`Started Server on Port ${config.port}`);
});
