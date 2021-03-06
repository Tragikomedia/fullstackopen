import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('Blog', () => {
  let component;
  const blog = {
    id: 'fmirgggrm',
    title: 'Cool title',
    author: 'Great Writer',
    url: 'www.goodblog.com',
    likes: 7,
    user: {
      username: 'user69',
      name: 'Mister User',
      id: 'abcdjfe',
    },
  };
  let likeBlog;
  let deleteBlog;

  beforeEach(() => {
    likeBlog = jest.fn();
    deleteBlog = jest.fn();
    component = render(
      <Blog blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} />
    );
  });

  it('Given initial state, should only show blog\'s title, author and button to show details', () => {
    const blogElt = component.container.querySelector('.blog');
    expect(blogElt).toHaveTextContent(blog.title);
    expect(blogElt).toHaveTextContent(blog.author);
    expect(blogElt).not.toHaveTextContent(blog.url);
    expect(blogElt).not.toHaveTextContent(blog.likes);
    const button = component.container.querySelector('button');
    expect(button).toHaveTextContent('Expand');
  });

  it('Given the expanding button\'s been clicked, should show detailed info', () => {
    const blogElt = component.container.querySelector('.blog');
    const button = component.container.querySelector('button');
    fireEvent.click(button);
    expect(blogElt).toHaveTextContent(blog.title);
    expect(blogElt).toHaveTextContent(blog.author);
    expect(blogElt).toHaveTextContent(blog.url);
    expect(blogElt).toHaveTextContent(blog.likes);
    const buttons = component.container.querySelectorAll('button');
    expect(buttons.length).toBe(3);
  });

  it('Given the like button\'s been clicked twice, likeBlog function should register two calls and been passed the blog', () => {
    const expandButton = component.container.querySelector('button');
    fireEvent.click(expandButton);
    const likeButton = component.getByText('Like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(likeBlog.mock.calls.length).toBe(2);
    expect(likeBlog.mock.calls[0][0]).toEqual(blog);
  });
});
