import Contact from "./Contact";

const Display = ({ contacts, handleDelete }) => (
  <>
    <ul>
      {contacts.map((contact) => (
        <Contact
          key={contact.id}
          contact={contact}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  </>
);

export default Display;
