const redis = require("redis");

const clientRedis = redis.createClient({
  password: "edpho@idm",
  socket: {
    host: "192.168.131.71",
    port: "6379",
  },
});

clientRedis.on("error", (err) => {
  client.disconnect();
  console.info(`Redis connection error: ${err}`);
});

clientRedis.on("connect", () => {
  console.info(`Connected to Redis server`);
});

clientRedis.on("ready", () => {
  console.info(`Redis server ready`);
});

clientRedis.on("reconnecting", () => {
  console.info(`ReConnecting to Redis server`);
});

clientRedis.on("end", () => {
  console.info(`Redis server Disconnect`);
});

clientRedis.connect();

module.exports = {
  clientRedis,
};
