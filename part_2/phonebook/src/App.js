import { useState } from "react";
import AddContactForm from "./AddContactForm";
import Display from "./Display";
import Input from "./Input";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [visiblePeople, setVisiblePeople] = useState({filter: "", list: [...persons]});

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    setVisiblePeople({
      filter,
      list: persons.filter(({ name }) => name.startsWith(filter))
    });
  };

  const nameRepeats = (name, persons) =>
    persons.find((person) => person.name === name);

  const addContact = (event) => {
    event.preventDefault();
    if (nameRepeats(newName, persons))
      return alert(`Name ${newName} already exists!`);
    const newPerson = { name: newName, number: newPhone }
    setPersons([...persons, newPerson]);
    setNewName("");
    setNewPhone("");
    setVisiblePeople({
      filter: "",
      list: [...persons, newPerson]
    });
  };

  const inputData = [
    {
      label: "name",
      type: "text",
      value: newName,
      handleChange: handleNameChange,
    },
    {
      label: "tel",
      type: "tel",
      value: newPhone,
      handleChange: handlePhoneChange,
    },
  ];

  return (
    <div>
      <h1>Phonebook</h1>
      <Input
        label={"Show names starting with"}
        type={"text"}
        value={visiblePeople.filter}
        handleChange={handleFilterChange}
      />
      <h2>Add new contacts</h2>
      <AddContactForm handleSubmit={addContact} inputData={inputData} />
      <h2>Numbers</h2>
      <Display contacts={visiblePeople.list} />
    </div>
  );
};

export default App;
