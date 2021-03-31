import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
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
  const likeBlog = jest.fn();
  const deleteBlog = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} />
    );
  });

  it('Should only show blog\'s title and author initially', () => {
    const blogElt = component.container.querySelector('.blog');
    expect(blogElt).toHaveTextContent(blog.title);
    expect(blogElt).toHaveTextContent(blog.author);
    expect(blogElt).not.toHaveTextContent(blog.url);
    expect(blogElt).not.toHaveTextContent(blog.id);
    const button = component.container.querySelector('button');
    expect(button).toHaveTextContent('Expand');
  });
});
