import Koa from "koa";
import logger from "koa-logger";
import KoaRouter from "koa-router";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import fetch from "node-fetch";
import _ from "lodash";
import session from "koa-session";

import dotenv from "dotenv";
dotenv.config();

const config = {
  apiKey: process.env.IGDB_USER_KEY,
  port: process.env.PORT || 3000,
  secretKey: "SOMETHINGSUPERSECRET"
};

const replaceImages = game => ({
  ...game,
  cover: {
    ...game.cover,
    url: `//images.igdb.com/igdb/image/upload/t_cover_big/${
      game.cover.cloudinary_id
    }.jpg`
  }
});

const recentGamesUrl = () => {
  const time = new Date().getTime();

  return (
    `games/?fields=name,first_release_date,cover,esrb,summary` +
    `&order=popularity:desc` +
    `&filter[created_at][not_eq]=1511784798211&filter[esrb][exists]=true&limit=20`
  );
};

const getPopularGames = async () => {
  const result = await fetch(
    `https://api-endpoint.igdb.com/${recentGamesUrl()}`,
    {
      headers: {
        "user-key": config.apiKey,
        Accept: "application/json"
      }
    }
  );

  return await result.json();
};

const app = new Koa();

app.keys = [config.secretKey];

app.use(logger());
app.use(cors({credentials: true}));
app.use(bodyParser());
app.use(session(app));

var router = new KoaRouter();

router.get("/games", async ctx => {
  try {
    if (ctx.session.games) {
      ctx.body = ctx.session.games.map(a => replaceImages(a));
    } else {
      const popularGames = await getPopularGames();
      const selectedGames = _.chain(popularGames)
        .shuffle()
        .take(2)
        .value();

      ctx.session.games = selectedGames;
      ctx.body = selectedGames.map(a => replaceImages(a));
    }
  } catch (error) {
    ctx.status = 500;

    ctx.body = { message: error.message };
  }
});

app.use(router.allowedMethods());
app.use(router.routes());

app.listen(config.port, () => {
  console.log(`Started Server on Port ${config.port}`);
});
