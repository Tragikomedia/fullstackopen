import { useState } from "react";

const Blog = ({ blog, likeBlog }) => {
  const [expand, setExpand] = useState(false);

const giveLike = () => {
  likeBlog(blog);
}

  return (
    <div className="blog">
      <ul>
        <li>
          {blog.title} {blog.author}
          <button onClick={() => setExpand(!expand)}>
            {expand ? "Hide" : "Expand"}
          </button>
        </li>
        {expand && (
          <>
            <li>{blog.url}</li>
            <li>{`likes ${blog.likes}`} <button onClick={giveLike}>Like</button></li>
            <li>{blog.user.name}</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Blog;
