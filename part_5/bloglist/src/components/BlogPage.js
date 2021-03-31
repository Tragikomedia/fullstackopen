import { useEffect, useRef, useState } from "react";
import blogService from "../services/blogs";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Toggleable from "./Toggleable";
import message from "../utils/messageHelper";

const BlogPage = ({ messaging, children }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(
    () =>
      (async () => {
        try {
          const dbBlogs = await blogService.getAll();
          setBlogs(dbBlogs);
        } catch {
          message.show(
            messaging.setErrorMessage,
            "Blogs could not have been retrieved"
          );
        }
      })(),
    [messaging]
  );

  const createBlogRef = useRef();

  const addBlog = async (blogData) => {
    try {
      const blog = await blogService.create(blogData);
      setBlogs(blogs.concat(blog));
      createBlogRef.current.toggleVisibility();
      message.show(
        messaging.setInfoMessage,
        `Blog ${blog.title} added successfully`
      );
    } catch (error) {
      const msg = error?.response?.data?.error ?? "Something went wrong";
      message.show(messaging.setErrorMessage, msg);
    }
  };

  const likeBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.like(blog);
      const updatedBlogs = blogs.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      );
      setBlogs(updatedBlogs);
    } catch {
      message.show(messaging.setErrorMessage, 'Could not like blog');
    }
  };

  return (
    <>
      <h2>Blogs</h2>
      {children}
      <Toggleable label={"Add blog"} ref={createBlogRef}>
        <BlogForm addBlog={addBlog} />
      </Toggleable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog}/>
      ))}
    </>
  );
};

export default BlogPage;
