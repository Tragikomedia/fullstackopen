const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'blog1',
    author: 'Author1',
    url: 'example1.com',
    likes: 5,
  },
  {
    title: 'blog2',
    author: 'Author2',
    url: 'example2.com',
    likes: 6,
  },
  {
    title: 'blog3',
    author: 'Author3',
    url: 'example3.com',
    likes: 23,
  },
];

const initialUsers = [
  {
    username: 'eligood',
    name: 'Eliwood of Pherae',
    passwordHash: 'royisourboy'
  },
  {
    username: 'bartrearmads',
    name: 'Bartre the Brave',
    passwordHash: 'nomagicallowed69'
  },
  {
    username: 'knightofCaelin',
    name: 'Kent',
    passwordHash: 'totallynotSain2'
  }
];

const emptyDb = async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});
};

const getSaving = (Struct, initials) => async () => {
  const structs = initials.map((struct) => new Struct(struct));
  const promiseArray = structs.map((struct) => struct.save());
  await Promise.all(promiseArray);
};

const saveInitialBlogs = getSaving(Blog, initialBlogs);
const saveInitialUsers = getSaving(User, initialUsers);

const getAllSaved = (Struct) => async () => await Struct.find({});

const allSavedBlogs = getAllSaved(Blog);
const allSavedUsers = getAllSaved(User);

module.exports = {
  allSavedBlogs,
  allSavedUsers,
  emptyDb,
  initialBlogs,
  initialUsers,
  saveInitialBlogs,
  saveInitialUsers
};
