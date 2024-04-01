import { UserRepository } from './user.repository.ts';

export class UserService {
  private readonly userRepository: UserRepository = new UserRepository();

  async getData(uuid: string): Promise<any> {
    return await this.userRepository.getUser(uuid);
  }

  async getRoles() {
    return await this.userRepository.getRoles();
  }

  async updateUser(body: any) {
    return await this.userRepository.updateUser(body.uuid, body);
  }

  async createUser(body: any) {
    return await this.userRepository.createUser(body);
  }
}
