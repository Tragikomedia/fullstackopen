const supertest = require('supertest');
const app = require('../app');
const db = require('../utils/db');
const helper = require('./helpers');
const Blog = require('../models/blog');

const api = supertest(app);

beforeAll(async () => {
  await db.connect();
});

beforeEach(async () => {
  await helper.emptyDb();
  await helper.saveInitialUsers();
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
    const savedBlog = blogsInDb.find(
      (blog) => blog.title === newBlog.title && blog.author === newBlog.author
    );
    expect(savedBlog.likes).toBe(0);
  });

  it('Given a request with no title set, should return res with status 400', async () => {
    const newBlog = {
      author: 'NAuthor',
      url: 'brandn.com',
      likes: 43,
    };
    await api.post('/api/blogs').send(newBlog).expect(400);
  });

  it('Given a request with no url set, should return res with status 400', async () => {
    const newBlog = {
      title: 'Some title',
      author: 'NAuthor',
      likes: 43,
    };
    await api.post('/api/blogs').send(newBlog).expect(400);
  });
});

describe('PUT /api/blogs/:id', () => {
  it('Given all valid parameters, should successfully update the blog', async () => {
    const params = {
      title: 'Totally new title',
      author: 'The author changed as well',
      url: 'brandnewurl3.ru',
      likes: 533,
    };
    const initialSavedBlogs = await helper.allSavedBlogs();
    const blogToUpdate = initialSavedBlogs[0];
    const res = await api.put(`/api/blogs/${blogToUpdate.id}`).send(params);
    expect(res.status).toBe(200);
    const currentSavedBlogs = await helper.allSavedBlogs();
    expect(currentSavedBlogs.length).toBe(helper.initialBlogs.length);
    const savedBlogsData = currentSavedBlogs.map(
      ({ title, author, url, likes }) => ({
        title,
        author,
        url,
        likes,
      })
    );
    expect(savedBlogsData).toContainEqual(params);
  });

  it('Given all valid parameters, should send json with updated blog info', async () => {
    const params = {
      title: 'Mega new title',
      author: 'The mega author changed as well',
      url: 'branmegadnewurl3.ru',
      likes: 642,
    };
    const initialSavedBlogs = await helper.allSavedBlogs();
    const blogToUpdate = initialSavedBlogs[0];
    const res = await api.put(`/api/blogs/${blogToUpdate.id}`).send(params);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ...params, id: blogToUpdate.id });
  });

  it('Given some parameters, should successfully update and save blog', async () => {
    const params = {
      likes: 999,
    };
    const initialSavedBlogs = await helper.allSavedBlogs();
    const blogToUpdate = initialSavedBlogs[0];
    const res = await api.put(`/api/blogs/${blogToUpdate.id}`).send(params);
    expect(res.status).toBe(200);
    const currentSavedBlogs = await helper.allSavedBlogs();
    const savedBlogsData = currentSavedBlogs.map(
      ({ title, author, url, likes }) => ({
        title,
        author,
        url,
        likes,
      })
    );
    const { title, author, url } = blogToUpdate;
    expect(savedBlogsData).toContainEqual({ title, author, url, ...params });
  });

  it('Given no parameters, should not change anything', async () => {
    const initialSavedBlogs = await helper.allSavedBlogs();
    const blogToUpdate = initialSavedBlogs[0];
    const res = await api.put(`/api/blogs/${blogToUpdate.id}`);
    expect(res.status).toBe(200);
    const currentSavedBlogs = await helper.allSavedBlogs();
    expect(currentSavedBlogs).toContainEqual(blogToUpdate);
  });

  it('Given valid id of a blog not in database, should return status 404', async () => {
    const params = {
      title: 'Mega new  cool title',
      author: 'The mega cool author changed as well',
      url: 'iijijiji.ru',
      likes: 642,
    };
    const blog = new Blog(params);
    await api.put(`/api/blogs/${blog.id}`).send({ likes: 2 }).expect(404);
  });

  it('Given malformatted id, should return status 400', async () => {
    await api.put('/api/blogs/wrong').send({ likes: 2 }).expect(400);
  });
});

describe('DELETE /api/blogs/:id', () => {
  it('Given a request with proper id of an existing blog, should remove the blog and return status 201', async () => {
    const initialBlogsInDb = await helper.allSavedBlogs();
    const blogToRemove = initialBlogsInDb[0];
    await api.delete(`/api/blogs/${blogToRemove.id}`).expect(204);
    const currentBlogsInDb = await helper.allSavedBlogs();
    expect(currentBlogsInDb).not.toContainEqual(blogToRemove);
  });

  it('Given a request with proper id of a blog not in db, should return status 201', async () => {
    const blog = new Blog({
      title: 'TOREMOVE',
      author: 'Removed Author',
      url: 'notexisting.com',
      likes: 404,
    });
    await api.delete(`/api/blogs/${blog.id}`).expect(204);
  });

  it('Given a request with malformed id, should return status 400', async () => {
    await api.delete('/api/blogs/wrong').expect(400);
  });
});

afterAll(() => {
  db.disconnect();
});
