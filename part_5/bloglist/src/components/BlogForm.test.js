import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

describe('BlogForm', () => {

  let component;
  let addBlog;

  beforeEach(() => {
    addBlog = jest.fn();
    component = render(<BlogForm addBlog={addBlog}/>);
  });

  it('Given the form has been submitted, mock function addBlog should receive a proper blog', () => {
    const blogInfo = {
      title: 'Tit Le',
      author: 'Au Thor',
      url: 'url.info.com'
    };
    const [inputTitle, inputAuthor, inputUrl] = component.container.querySelectorAll('input');
    const form = component.container.querySelector('form');
    fireEvent.change(inputTitle, {
      target: {
        value: blogInfo.title
      }
    });
    fireEvent.change(inputAuthor, {
      target: {
        value: blogInfo.author
      }
    });
    fireEvent.change(inputUrl, {
      target: {
        value: blogInfo.url
      }
    });
    fireEvent.submit(form);
    expect(addBlog.mock.calls.length).toBe(1);
    expect(addBlog.mock.calls[0][0]).toEqual(blogInfo);
  });
});