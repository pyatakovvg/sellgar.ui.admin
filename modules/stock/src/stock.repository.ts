import { HttpClient } from '@library/domain';

export class StockRepository {
  private readonly fetch: HttpClient = new HttpClient();

  async getUsers(): Promise<any[]> {
    // const users = await this.fetch.send({
    //   url: '/users',
    // });
    // console.log(users);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            uuid: '1',
            name: 'First',
          },
          {
            uuid: '2',
            name: 'Second',
          },
        ]);
      }, 2000);
    });
  }
}
