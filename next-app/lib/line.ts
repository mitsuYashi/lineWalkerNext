import {
  ClientConfig,
  Client,
  middleware as lineMiddleware,
  MiddlewareConfig,
} from '@line/bot-sdk';

// Setup all LINE client and Express configurations.
const clientConfig: ClientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.CHANNEL_SECRET,
};

const middlewareConfig: MiddlewareConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET || '',
};

export const client = new Client(clientConfig);
export const middleware = lineMiddleware(middlewareConfig);
