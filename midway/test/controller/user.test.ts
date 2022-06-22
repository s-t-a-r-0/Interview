import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Application, Framework } from '@midwayjs/koa';

describe('test/controller/user.test.ts', () => {
  let app: Application;
  beforeAll(async () => {
    // 只创建一次 app，可以复用
    try {
      // 由于Jest在BeforeAll阶段的error会忽略，所以需要包一层catch
      // refs: https://github.com/facebook/jest/issues/8688
      app = await createApp<Framework>();
    } catch (err) {
      console.error('test beforeAll error', err);
      throw err;
    }
  });

  afterAll(async () => {
    // close app
    await close(app);
  });
  it('should Post /api/user/login success', async () => {
    // create app
    const startTime = Date.now();
    // make request
    const result = await createHttpRequest(app).post('/api/user/login').send({
      username: 'jack',
      password: 'redballoon',
    });
    const valueType = {
      code: 200,
      result: 'success',
      message: '登录成功',
      data: null,
    };
    valueType.data = result.body.data;
    const cost = Date.now() - startTime;
    // use expect by jest
    expect(cost).toBeLessThanOrEqual(1000);
    expect(result.body).toStrictEqual(valueType);
  });

  it('should Post /api/user/login failed', async () => {
    // create app
    const startTime = Date.now();
    // make request
    const result = await createHttpRequest(app).post('/api/user/login').send({
      username: '11',
      password: '11',
    });
    const cost = Date.now() - startTime;
    const valueType = {
      code: 400,
      result: 'error',
      message: '账号或密码不正确',
      data: null,
    };

    // use expect by jest
    expect(cost).toBeLessThanOrEqual(1000);
    expect(result.body).toStrictEqual(valueType);
  });
});
