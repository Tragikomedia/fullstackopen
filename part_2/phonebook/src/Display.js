import Contact from "./Contact";

const Display = ({ contacts }) => (
  <>
    <ul>
      {contacts.map((contact) => (
        <Contact key={contact.name} name={contact.name} number={contact.number} />
      ))}
    </ul>
  </>
);

export default Display;
