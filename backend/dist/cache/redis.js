"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_EXPIRATION = void 0;
exports.createRedisClient = createRedisClient;

var _redis = require("redis");

const DEFAULT_EXPIRATION = 3600;
exports.DEFAULT_EXPIRATION = DEFAULT_EXPIRATION;

async function createRedisClient() {
  const client = (0, _redis.createClient)();
  await client.connect(); // const client = createClient(
  //   {
  //     socket: {
  //       host: process.env.REDIS_HOST,
  //       port: process.env.REDIS_PORT
  //   },
  //     password: process.env.REDIS_PASSWORD
  //   }
  // )

  client.on('error', err => console.log('Redis Client Error', err));
  return client;
}