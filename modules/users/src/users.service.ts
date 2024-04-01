import { UsersRepository } from './users.repository';

export class UsersService {
  private readonly userRepository: UsersRepository = new UsersRepository();
  async getData(): Promise<any> {
    return await this.userRepository.getUsers();
  }
}
