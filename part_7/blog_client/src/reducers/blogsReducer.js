const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'VOTE_BLOG': {
    const updatedBlog = action.data.blog;
    return state.map((blog) =>
      blog.id !== updatedBlog.id ? blog : updatedBlog
    );
  }
  case 'CREATE_BLOG': {
    return state.concat(action.data.blog);
  }
  case 'DELETE_BLOG': {
    return state.filter((blog) => blog.id !== action.data.id);
  }
  case 'COMMENT_BLOG': {
    const updatedBlog = action.data.blog;
    return state.map((blog) =>
      blog.id !== updatedBlog.id
        ? blog
        : updatedBlog
    );
  }
  case 'INIT_BLOG': {
    return [...action.data.blogs];
  }
  default: {
    return state;
  }
  }
};

export default reducer;
