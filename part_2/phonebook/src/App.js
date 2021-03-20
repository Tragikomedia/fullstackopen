import { useState, useEffect } from "react";
import AddContactForm from "./AddContactForm";
import Display from "./Display";
import Filter from "./Filter";
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [visiblePeople, setVisiblePeople] = useState({
    filter: "",
    list: [...persons],
  });

  const fetchContacts = async () => {
    const res = await axios.get('http://localhost:3001/persons');
    setPersons(res.data);
    setVisiblePeople({filter: "", list: res.data});
  }

  useEffect( () => {
    fetchContacts();
  }, []);


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
      list: persons.filter(({ name }) =>
        name.toLowerCase().includes(filter.toLowerCase())
      ),
    });
  };

  const nameRepeats = (name, persons) =>
    persons.find((person) => person.name === name);

  const addContact = (event) => {
    event.preventDefault();
    if (nameRepeats(newName, persons))
      return alert(`Name ${newName} already exists!`);
    const newPerson = { name: newName, number: newPhone };
    setPersons([...persons, newPerson]);
    setNewName("");
    setNewPhone("");
    setVisiblePeople({
      filter: "",
      list: [...persons, newPerson],
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
      <Filter value={visiblePeople.filter} handleChange={handleFilterChange} />
      <h2>Add new contacts</h2>
      <AddContactForm handleSubmit={addContact} inputData={inputData} />
      <h2>Numbers</h2>
      <Display contacts={visiblePeople.list} />
    </div>
  );
};

export default App;
