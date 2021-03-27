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
  await helper.saveInitialBlogs();
});

describe('GET /api/blogs/', () => {
  it('Given normal circumstances, should receive json file', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  it('Given regular state of test database, should receive all initial blogs', async () => {
    const res = await api.get('/api/blogs');
    expect(res.body).toHaveLength(helper.initialBlogs.length);
  });

  it('Given regular state of test database, should receive a specific initial blog among others', async () => {
    const res = await api.get('/api/blogs');
    const titles = res.body.map((blog) => blog.title);
    expect(titles).toContain(helper.initialBlogs[0].title);
  });
});

describe('POST /api/blogs', () => {
  it('Given a proper request, should save blog to the database', async () => {
    const newBlog = {
      title: 'Blog New',
      author: 'Author New',
      url: 'brandnew.new',
      likes: 22,
    };
    const res = await api.post('/api/blogs').send(newBlog);
    expect(res.status).toBe(201);
    const blogsInDb = await helper.allSavedBlogs();
    expect(blogsInDb.length).toBe(helper.initialBlogs.length + 1);
    const savedBlogs = blogsInDb.map(({ title, author, url, likes }) => ({
      title,
      author,
      url,
      likes,
    }));
    expect(savedBlogs).toContainEqual(newBlog);
  });

  it('Given a proper request, should send the saved blog back as json', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'New Author',
      url: 'brandnew.com',
      likes: 93,
    };
    const res = await api.post('/api/blogs').send(newBlog);
    expect(res.status).toBe(201);
    const { title, author, url, likes } = res.body;
    expect({ title, author, url, likes }).toEqual(newBlog);
  });
  it('Given a request with no likes set, should save the blog with likes set to 0', async () => {
    const newBlog = {
      title: 'NBlog',
      author: 'NAuthor',
      url: 'brandn.com',
    };
    await api.post('/api/blogs').send(newBlog);
    const blogsInDb = await helper.allSavedBlogs();
    const savedBlog = blogsInDb.find(blog => blog.title === newBlog.title && blog.author === newBlog.author);
    expect(savedBlog.likes).toBe(0);
  });
});

afterAll(() => {
  db.disconnect();
});
