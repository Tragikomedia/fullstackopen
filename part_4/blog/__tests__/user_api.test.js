const supertest = require('supertest');
const app = require('../app');
const db = require('../utils/db');
const helper = require('./helpers');

const api = supertest(app);

beforeAll(async () => {
  await db.connect();
});

beforeEach(async () => {
  await helper.emptyDb();
  await helper.saveInitialUsers();
});

describe('GET /api/users', () => {
  it('Given a request is made, should return a list of all users without password info', async () => {
    const res = await api.get('/api/users');
    expect(res.status).toBe(200);
    const usersFromRes = res.body;
    const usersInDb = await helper.allSavedUsers();
    expect(usersFromRes.length).toBe(usersInDb.length);
    const usersInfo = usersInDb.map((user) => user.toJSON());
    expect(usersFromRes).toContainEqual(usersInfo[0]);
    expect(usersFromRes[0].passwordHash).not.toBeDefined();
  });
});

describe('POST /api/users', () => {
  it('Given a request with proper data, should save user to database', async () => {
    const userData = {
      username: 'hctr1',
      name: 'Hector of Ostia',
      password: 'lilina1',
    };
    await api.post('/api/users').send(userData).expect(201);
    const currentUsers = await helper.allSavedUsers();
    expect(currentUsers.length).toBe(helper.initialUsers.length + 1);
    const usersInfo = currentUsers.map((user) => ({
      username: user.username,
      name: user.name,
    }));
    expect(usersInfo).toContainEqual({
      username: userData.username,
      name: userData.name,
    });
  });

  it('Given a request with proper data, should return the user info as json', async () => {
    const userData = {
      username: 'hctr1',
      name: 'Hector of Ostia',
      password: 'lilina1',
    };
    const res = await api.post('/api/users').send(userData);
    const { username, name, id } = res.body;
    expect({ username, name }).toEqual({
      username: userData.username,
      name: userData.name,
    });
    expect(id).toBeDefined;
  });

  it('Given a request with non-unique username, should return status 400', async () => {
    const userData = {
      username: helper.initialUsers[0].username,
      name: 'Impostor',
      password: 'hyehye33',
    };
    const res = await api.post('/api/users').send(userData);
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch('Username must be unique');
    const currentUsers = await helper.allSavedUsers();
    expect(currentUsers.length).toBe(helper.initialUsers.length);
  });

  it('Given a request with missing password, should return status 400', async () => {
    const userData = {
      username: 'hctr1',
      name: 'Hector of Ostia',
    };
    const res = await api.post('/api/users').send(userData);
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(
      'Username, name and password must be provided'
    );
    const currentUsers = await helper.allSavedUsers();
    expect(currentUsers.length).toBe(helper.initialUsers.length);
  });

  it('Given a request with missing username, should return status 400', async () => {
    const userData = {
      name: 'Hector of Ostia',
      password: 'lilina1',
    };
    const res = await api.post('/api/users').send(userData);
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(
      'Username, name and password must be provided'
    );
    const currentUsers = await helper.allSavedUsers();
    expect(currentUsers.length).toBe(helper.initialUsers.length);
  });

  it('Given a request with missing name, should return status 400', async () => {
    const userData = {
      username: 'hctr1',
      password: 'lilina1',
    };
    const res = await api.post('/api/users').send(userData);
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(
      'Username, name and password must be provided'
    );
    const currentUsers = await helper.allSavedUsers();
    expect(currentUsers.length).toBe(helper.initialUsers.length);
  });

  it('Given a request with too short password, should return status 400', async () => {
    const userData = {
      username: 'hctr1',
      name: 'Hector of Ostia',
      password: 'l1',
    };
    const res = await api.post('/api/users').send(userData);
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(
      'Password must be at least 3 characters long'
    );
    const currentUsers = await helper.allSavedUsers();
    expect(currentUsers.length).toBe(helper.initialUsers.length);
  });

  it('Given a request with too short username, should return status 400', async () => {
    const userData = {
      username: 'h1',
      name: 'Hector of Ostia',
      password: 'lilina1',
    };
    const res = await api.post('/api/users').send(userData);
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(
      'User validation failed: username: Username must be at least 3 characters long'
    );
    const currentUsers = await helper.allSavedUsers();
    expect(currentUsers.length).toBe(helper.initialUsers.length);
  });
});

afterAll(() => {
  db.disconnect();
});
