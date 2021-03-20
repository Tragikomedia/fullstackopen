import { useState } from "react";
import Input from "./Input";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const nameRepeats = (name, persons) =>
    persons.find((person) => person.name === name);

  const addContact = (event) => {
    event.preventDefault();
    if (nameRepeats(newName, persons))
      return alert(`Name ${newName} already exists!`);
    setPersons([...persons, { name: newName, phone: newPhone }]);
    setNewName("");
    setNewPhone("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <Input
          label={"name"}
          type={"text"}
          value={newName}
          handleChange={handleNameChange}
        />
        <Input
          label={"tel"}
          type={"tel"}
          value={newPhone}
          handleChange={handlePhoneChange}
        />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
            {person.name} {person.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
