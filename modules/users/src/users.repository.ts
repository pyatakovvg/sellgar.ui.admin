import { Fetch } from '@library/app';

export class UsersRepository {
  private readonly fetch: Fetch = new Fetch({
    baseURL: 'http://localhost:4020',
  });

  async getUsers(): Promise<any[]> {
    const users = await this.fetch.send({
      url: '/users',
    });

    console.log(users);
    return users;
  }
}
