import { MidwayConfig } from '@midwayjs/core';
import path = require('path');
import { UserEntity } from '../entity/user_entity';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1655707180448_8510',
  koa: {
    port: 7001,
  },
  jwt: {
    secret: 'redballoon', // fs.readFileSync('xxxxx.key')
    expiresIn: '2d', // https://github.com/vercel/ms
  },
  orm: {
    type: 'sqlite',
    database: path.join(__dirname, '../sqlite/test.db'),
    dropSchema: false,
    entities: [UserEntity],
    synchronize: false,
    logging: false,
  },
} as MidwayConfig;
