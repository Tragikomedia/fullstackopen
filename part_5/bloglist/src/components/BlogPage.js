import { useEffect, useState } from "react";
import blogService from "../services/blogs";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

const BlogPage = ({ messaging, children }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(
    () =>
      (async () => {
        const dbBlogs = await blogService.getAll();
        setBlogs(dbBlogs);
      })(),
    []
  );

  const addBlog = async (blogData) => {
    try {
      const blog = await blogService.create(blogData);
      setBlogs(blogs.concat(blog));
      messaging.setInfoMessage(`Blog ${blog.title} added successfully`);
      setTimeout(() => messaging.setInfoMessage(''), 5000);
    } catch (error) {
      const message = error?.response?.data?.error ?? "Something went wrong";
      messaging.setErrorMessage(message);
      setTimeout(() => messaging.setErrorMessage(''), 5000);
    }
  };

  return (
    <>
      <h2>Blogs</h2>
      {children}
      <BlogForm addBlog={addBlog} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default BlogPage;
