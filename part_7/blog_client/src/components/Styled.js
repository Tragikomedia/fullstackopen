import styled from 'styled-components';

export const Nav = styled.nav`
  background-color: orange;
  border-radius: 16px;
  opacity: 0.8;
  margin-top: 2rem;
  padding: 2rem 0.5rem;
`;

export const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const NavLi = styled.li`
  padding-right: 0.5rem;
  opacity: 1;
  & a,
  button {
    background-color: black;
    color: white;
    padding: 0.5rem;
    text-decoration: none;
  }
  & a:hover,
  button:hover {
    background-color: white;
    color: black;
  }
  & h3 {
    display: inline-block;
    padding-left: 3rem;
  }
  & button {
    border: none;
    margin-left: 1rem;
  }
`;

export const StyledApp = styled.div`
  background-color: white;
  border-radius: 5%;
  margin: 2rem auto;
  padding: 2rem;
  width: 90vw;
  height: 90vh;
`;

export const InfoList = styled.ul`
  list-style: none;
`;
