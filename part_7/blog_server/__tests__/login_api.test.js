const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const db = require('../utils/db');
const { hashPassword } = require('../utils/user_helper');
const helper = require('./helpers');

const api = supertest(app);

beforeAll(async () => {
  await db.connect();
});

beforeEach(async () => {
  await helper.emptyDb();
});

describe('POST /api/login', () => {
  it('Given proper credentials of a user stored in db, should return status 200 and object with data', async () => {
    const password = 'Jeralt4ever';
    const passwordHash = await hashPassword(password);
    const userData = {
      username: 'captainJeralt',
      name: 'Leonie Pinelli',
      passwordHash,
    };
    const user = new User(userData);
    await user.save();
    const res = await api
      .post('/api/login')
      .send({ username: userData.username, password });
    expect(res.status).toBe(200);
    const { username, token, name } = res.body;
    expect({ username, name }).toEqual({
      username: userData.username,
      name: userData.name,
    });
    expect(token).toBeDefined();
  });

  it('Given credentials of non-existing user, should return status 401 and error message', async () => {
    const res = await api
      .post('/api/login')
      .send({ username: 'No such user', password: 'passwordwhat' });
    expect(res.status).toBe(401);
    expect(res.body.error).toMatch('Invalid username or password');
    expect(res.body.token).not.toBeDefined();
  });

  it('Given incorrect password, should return status 401 and error message', async () => {
    const password = 'Jeralt4ever';
    const passwordHash = await hashPassword(password);
    const userData = {
      username: 'captainJeralt',
      name: 'Leonie Pinelli',
      passwordHash,
    };
    const user = new User(userData);
    await user.save();
    const res = await api
      .post('/api/login')
      .send({
        username: userData.username,
        password: 'TOTALLY WRONG PASSWORD',
      });
    expect(res.status).toBe(401);
    expect(res.body.error).toMatch('Invalid username or password');
    expect(res.body.token).not.toBeDefined();
  });
});

afterAll(() => {
  db.disconnect();
});
