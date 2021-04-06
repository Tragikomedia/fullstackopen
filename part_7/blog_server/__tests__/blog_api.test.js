const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const Blog = require('../models/blog');
const db = require('../utils/db');
const helper = require('./helpers');

const api = supertest(app);

beforeAll(async () => {
  await db.connect();
});

beforeEach(async () => {
  await helper.emptyDb();
  await helper.initDbTestState();
});

describe('GET /api/blogs/', () => {
  it('Given normal circumstances, should receive json file', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  it('Given regular state of test database, should receive all initial blogs', async () => {
    const initialBlogs = await helper.allSavedBlogs();
    const res = await api.get('/api/blogs');
    expect(res.body).toHaveLength(initialBlogs.length);
  });

  it('Given regular state of test database, should receive a specific initial blog among others', async () => {
    const initialBlogs = await helper.allSavedBlogs();
    const res = await api.get('/api/blogs');
    const titles = res.body.map((blog) => blog.title);
    expect(titles).toContain(initialBlogs[0].title);
  });
});

describe('POST /api/blogs', () => {
  it('Given a proper request, should save blog to the database', async () => {
    const initialBlogs = await helper.allSavedBlogs();
    const { user, token } = await helper.getTokenAndId();
    const newBlog = {
      title: 'Blog New',
      author: 'Author New',
      url: 'brandnew.new',
      likes: 22,
      user: user,
    };
    const res = await api
      .post('/api/blogs')
      .set('Authorization', helper.addToken(token))
      .send(newBlog);
    expect(res.status).toBe(201);
    const blogsInDb = await helper.allSavedBlogs();
    expect(blogsInDb.length).toBe(initialBlogs.length + 1);
    const savedBlogs = blogsInDb.map(({ title, author, url, likes, user }) => ({
      title,
      author,
      url,
      likes,
      user,
    }));
    expect(savedBlogs).toContainEqual(newBlog);
  });

  it('Given a proper request, should send the saved blog back as json', async () => {
    const { user, token } = await helper.getTokenAndId();
    const newBlog = {
      title: 'New Blog',
      author: 'New Author',
      url: 'brandnew.com',
      likes: 93,
    };
    const res = await api
      .post('/api/blogs')
      .set('Authorization', helper.addToken(token))
      .send(newBlog);
    expect(res.status).toBe(201);
    const { title, author, url, likes, } = res.body;
    expect({ title, author, url, likes }).toEqual(newBlog);
    const resUser = res.body.user;
    expect(user.toString()).toBe(resUser.id);
    expect(resUser.username).toBeDefined();
    expect(resUser.name).toBeDefined();
    expect(resUser.blogs.length).toBe(1);
  });

  it('Given a request with no likes set, should save the blog with likes set to 0', async () => {
    const { token } = await helper.getTokenAndId();
    const newBlog = {
      title: 'NBlog',
      author: 'NAuthor',
      url: 'brandn.com',
    };
    await api
      .post('/api/blogs')
      .set('Authorization', helper.addToken(token))
      .send(newBlog);
    const blogsInDb = await helper.allSavedBlogs();
    const savedBlog = blogsInDb.find(
      (blog) => blog.title === newBlog.title && blog.author === newBlog.author
    );
    expect(savedBlog.likes).toBe(0);
  });

  it('Given a request with no title set, should return res with status 400', async () => {
    const { token } = await helper.getTokenAndId();
    const newBlog = {
      author: 'NAuthor',
      url: 'brandn.com',
      likes: 43,
    };
    await api
      .post('/api/blogs')
      .set('Authorization', helper.addToken(token))
      .send(newBlog)
      .expect(400);
  });

  it('Given a request with no url set, should return res with status 400', async () => {
    const { token } = await helper.getTokenAndId();
    const newBlog = {
      title: 'Some title',
      author: 'NAuthor',
      likes: 43,
    };
    await api
      .post('/api/blogs')
      .set('Authorization', helper.addToken(token))
      .send(newBlog)
      .expect(400);
  });

  it('Given a request with a valid token of an unsaved user, should return res with status 401', async () => {
    const user = new User({
      username: 'user',
      name: 'MR USER',
      passwordHash: 'pashash',
    });
    const token = helper.getToken(user);
    const newBlog = {
      title: 'Some title',
      author: 'NAuthor',
      likes: 43,
    };
    await api
      .post('/api/blogs')
      .set('Authorization', helper.addToken(token))
      .send(newBlog)
      .expect(401);
  });

  it('Given a request with no token, should return res with status 401', async () => {
    const newBlog = {
      title: 'Some title',
      author: 'NAuthor',
      likes: 43,
    };
    await api.post('/api/blogs').send(newBlog).expect(401);
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
    const user = await User.findById(blogToUpdate.user);
    const token = helper.getToken(user);
    const res = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', helper.addToken(token))
      .send(params);
    expect(res.status).toBe(200);
    const currentSavedBlogs = await helper.allSavedBlogs();
    expect(currentSavedBlogs.length).toBe(initialSavedBlogs.length);
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
    const user = await User.findById(blogToUpdate.user);
    const token = helper.getToken(user);
    const res = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', helper.addToken(token))
      .send(params);
    expect(res.status).toBe(200);
    const { author, id, likes, title, url } = res.body;
    expect({ author, id, likes, title, url }).toEqual({
      ...params,
      id: blogToUpdate.id,
    });
  });

  it('Given some parameters, should successfully update and save blog', async () => {
    const params = {
      likes: 999,
    };
    const initialSavedBlogs = await helper.allSavedBlogs();
    const blogToUpdate = initialSavedBlogs[0];
    const user = await User.findById(blogToUpdate.user);
    const token = helper.getToken(user);
    const res = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', helper.addToken(token))
      .send(params);
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
    const user = await User.findById(blogToUpdate.user);
    const token = helper.getToken(user);
    const res = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', helper.addToken(token));
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
    const users = await helper.allSavedUsers();
    const token = helper.getToken(users[0]);
    await api
      .put(`/api/blogs/${blog.id}`)
      .set('Authorization', helper.addToken(token))
      .send({ likes: 2 })
      .expect(404);
  });

  it('Given malformatted id, should return status 400', async () => {
    const users = await helper.allSavedUsers();
    const token = helper.getToken(users[0]);
    await api
      .put('/api/blogs/wrong')
      .set('Authorization', helper.addToken(token))
      .send({ likes: 2 })
      .expect(400);
  });

  it('Given no token and change other than likes, should return status 401', async () => {
    const params = {
      author: 'Wrong Person',

    };
    const initialSavedBlogs = await helper.allSavedBlogs();
    const blogToUpdate = initialSavedBlogs[0];
    await api.put(`/api/blogs/${blogToUpdate.id}`).send(params).expect(401);
  });

  it('Given no token and likes change, should return status 200', async () => {
    const params = {
      likes: 669
    };
    const initialSavedBlogs = await helper.allSavedBlogs();
    const blogToUpdate = initialSavedBlogs[0];
    await api.put(`/api/blogs/${blogToUpdate.id}`).send(params).expect(200);
  });

  it('Given a valid token of a different user, should return status 401', async () => {
    const users = await helper.allSavedUsers();
    const token = helper.getToken(users[2]);
    const params = {
      title: 'Mega new title',
      author: 'The mega author changed as well',
      url: 'branmegadnewurl3.ru',
      likes: 642,
    };
    const initialSavedBlogs = await helper.allSavedBlogs();
    const blogToUpdate = initialSavedBlogs[0];
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', helper.addToken(token))
      .send(params)
      .expect(401);
  });
});

describe('DELETE /api/blogs/:id', () => {
  it('Given a request with proper id of an existing blog, should remove the blog and return status 201', async () => {
    const initialBlogsInDb = await helper.allSavedBlogs();
    const blogToRemove = initialBlogsInDb[0];
    const user = await User.findById(blogToRemove.user);
    const token = helper.getToken(user);
    await api
      .delete(`/api/blogs/${blogToRemove.id}`)
      .set('Authorization', helper.addToken(token))
      .expect(204);
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
    const users = await helper.allSavedUsers();
    const token = helper.getToken(users[2]);
    await api
      .delete(`/api/blogs/${blog.id}`)
      .set('Authorization', helper.addToken(token))
      .expect(204);
  });

  it('Given a request with malformed id, should return status 400', async () => {
    const users = await helper.allSavedUsers();
    const token = helper.getToken(users[2]);
    await api
      .delete('/api/blogs/wrong')
      .set('Authorization', helper.addToken(token))
      .expect(400);
  });

  it('Given a request with no token, should return status 401', async () => {
    const initialBlogsInDb = await helper.allSavedBlogs();
    const blogToRemove = initialBlogsInDb[0];
    await api.delete(`/api/blogs/${blogToRemove.id}`).expect(401);
  });

  it('Given a request with a valid token of a different user, should return status 401', async () => {
    const initialBlogsInDb = await helper.allSavedBlogs();
    const blogToRemove = initialBlogsInDb[0];
    const users = await helper.allSavedUsers();
    const token = helper.getToken(users[2]);
    await api
      .delete(`/api/blogs/${blogToRemove.id}`)
      .set('Authorization', helper.addToken(token))
      .expect(401);
  });
});

afterAll(() => {
  db.disconnect();
});
