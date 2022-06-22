import { Inject, Controller, Post, Body, ALL } from '@midwayjs/decorator';
import { JwtService } from '@midwayjs/jwt';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import { UserLoginDTO } from '../dto/user.dto';
import { UserModel } from '../model/user.model';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userModel: UserModel;

  @Inject()
  jwt: JwtService;

  @Post('/user/login')
  @Validate()
  async getUser(@Body(ALL) body: UserLoginDTO) {
    console.log(body, 'body');
    const { username, password } = body;
    const data = await this.userModel.getUserByUsernameAndPassword(
      username,
      password
    );
    console.log('data---------', data);
    if (data['result'] === 'success') {
      const token = await this.jwt.sign({ msg: '登录成功' });
      return {
        code: 200,
        result: 'success',
        message: '登录成功',
        data: {
          token: 'Bearer ' + token,
        },
      };
    }
    return {
      code: 400,
      result: 'error',
      message: '账号或密码不正确',
      data: null,
    };
  }
}
