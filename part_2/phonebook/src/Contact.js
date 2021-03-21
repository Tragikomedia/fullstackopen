const Contact = ({ contact, handleDelete }) => (
  <>
    <li>
      {contact.name} {contact.number}{" "}
      <button onClick={() => handleDelete(contact)}>del</button>
    </li>
  </>
);

export default Contact;
