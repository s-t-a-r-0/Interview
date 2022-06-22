import { InjectEntityModel } from '@midwayjs/orm';
import { Provide } from '@midwayjs/decorator';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user_entity';

interface ResultType {
  result: 'success' | 'failed';
  data?: UserEntity;
}

@Provide()
export class UserModel {
  @InjectEntityModel(UserEntity)
  userRepo: Repository<UserEntity>;

  /**
   * 根据用户名和密码获取用户信息
   * @param username {String} 用户名
   * @param password {String} 用户密码
   */
  async getUserByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<ResultType> {
    console.log('----------', username, password);
    const result = await this.userRepo.findOne({
      where: {
        username,
        password,
      },
    });
    console.log('resule', result);
    if (result != null) {
      return {
        result: 'success',
        data: result,
      };
    }
    return {
      result: 'failed',
      data: null,
    };
  }
}
