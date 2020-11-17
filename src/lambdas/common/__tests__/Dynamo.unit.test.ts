import { createItem } from '../Dynamo';

describe('Dynamo Common Functions', () => {
  beforeAll(() => {
    process.env.tableName = 'serverless-test-cool-places-dev';
  });

  it('Dynamo has createItem', () => {
    expect(typeof createItem).toBe('function');
  });

  it('Dynamo write valid works', async () => {
    expect.assertions(1);
    try {
      const res = await createItem('Testing Name');
      expect(res).toMatchObject({ name: 'Testing Name' });
    } catch (err) {
      console.log('Error in dynamo write test', err);
    }
  });

  it('Dynamo write empty works', async () => {
    expect.assertions(1);
    try {
      const res = await createItem('');
      console.log(res);
    } catch (err) {
      expect(err.message).toBe('There was no name in body');
    }
  });
});
