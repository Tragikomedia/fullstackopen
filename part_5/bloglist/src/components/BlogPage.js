import { useEffect, useState } from "react";
import blogService from "../services/blogs";
import Blog from "./Blog";

const BlogPage = (props) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(
    () =>
      (async () => {
        const dbBlogs = await blogService.getAll();
        setBlogs(dbBlogs);
      })(),
    []
  );

  return (
    <>
      <h2>Blogs</h2>
      {props.children}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default BlogPage;