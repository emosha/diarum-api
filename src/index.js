import { config } from 'dotenv';
import server from './server';

config();

server.start({ port: process.env.PORT || 4000 }, () => {
  console.log('Server started');
});
