import redis from 'redis';
import { logger } from '../config/logger.js';

export const client = redis.createClient({
    socket: {
        host: '192.168.131.71',
        port: '6379'
    }
});

client.on('error', (err) => {
  client.disconnect();  
  logger.info(`Redis connection error: ${err}`);
  });

client.on('connect', () => { 
  logger.info(`Connected to Redis server`); 
});

client.on('ready', () => {
  logger.info(`Redis server ready`);
});

client.on('reconnecting', () => {
  logger.info(`ReConnecting to Redis server`);
});

client.on('end', () => {
  logger.info(`Redis server Disconnect`);
});

client.connect()