import { Fetch } from '@library/app';

export class UserRepository {
  private readonly fetch: Fetch = new Fetch({
    baseURL: 'http://localhost:4020',
  });

  async getUser(uuid: string): Promise<any[]> {
    const user = await this.fetch.send({
      url: '/users/' + uuid,
    });

    return {
      ...user,
      roles: user.roles.map((role: any) => role.code),
    };
  }

  async getRoles(): Promise<any[]> {
    const roles = await this.fetch.send({
      url: '/roles',
    });
    return [
      ...roles.map((role: any) => ({
        code: role.code,
        displayName: role.displayName,
      })),
    ];
  }

  async updateUser(uuid: string, body: any) {
    const user = await this.fetch.send({
      url: '/users/' + uuid,
      method: 'put',
      data: body,
    });

    return {
      ...user,
      roles: user.roles.map((role: any) => role.code),
    };
  }

  async createUser(body: any) {
    const user = await this.fetch.send({
      url: '/users',
      method: 'post',
      data: body,
    });

    return {
      ...user,
      roles: user.roles.map((role: any) => role.code),
    };
  }
}
