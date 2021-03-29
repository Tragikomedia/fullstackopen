const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const emptyDb = async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});
};

const getSaving = (Struct, initials) => async () => {
  const structs = initials.map((struct) => new Struct(struct));
  const promiseArray = structs.map(async (struct) => await struct.save());
  await Promise.all(promiseArray);
};

const getAllSaved = (Struct) => async () => await Struct.find({});

const allSavedBlogs = getAllSaved(Blog);
const allSavedUsers = getAllSaved(User);

const initDbTestState = async () => {
  const initialUsers = [
    {
      username: 'eligood',
      name: 'Eliwood of Pherae',
      passwordHash: 'royisourboy',
    },
    {
      username: 'bartrearmads',
      name: 'Bartre the Brave',
      passwordHash: 'nomagicallowed69',
    },
    {
      username: 'knightofCaelin',
      name: 'Kent',
      passwordHash: 'totallynotSain2',
    },
  ];
  const saveInitialUsers = getSaving(User, initialUsers);
  await saveInitialUsers();
  const users = await allSavedUsers();

  const initialBlogs = [
    {
      title: 'blog1',
      author: 'Author1',
      url: 'example1.com',
      likes: 5,
      user: users[0]._id,
    },
    {
      title: 'blog2',
      author: 'Author2',
      url: 'example2.com',
      likes: 6,
      user: users[0]._id,
    },
    {
      title: 'blog3',
      author: 'Author3',
      url: 'example3.com',
      likes: 23,
      user: users[1]._id,
    },
  ];
  const saveInitialBlogs = getSaving(Blog, initialBlogs);
  await saveInitialBlogs();
};

const getToken = (user) =>
  jwt.sign({ id: user._id, username: user.username }, config.JWT_SECRET);

const addToken = (token) => `Bearer ${token}`;
const saveUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

const getTokenAndId = async (
  userData = {
    username: 'Testoser',
    name: 'Test User, mr.',
    passwordHash: 'hashhash2',
  }
) => {
  const user = await saveUser(userData);
  const token = getToken(user);
  return { user: user._id, token };
};

module.exports = {
  addToken,
  allSavedBlogs,
  allSavedUsers,
  emptyDb,
  getToken,
  getTokenAndId,
  initDbTestState,
};
