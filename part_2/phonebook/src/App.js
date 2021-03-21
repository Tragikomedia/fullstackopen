import { useState, useEffect } from "react";
import AddContactForm from "./AddContactForm";
import Display from "./Display";
import Filter from "./Filter";
import Notification from "./Notification";
import db from "./db";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [visiblePeople, setVisiblePeople] = useState({
    filter: "",
    list: [...persons],
  });
  const [notification, setNotification] = useState({});

  const fetchContacts = async () => {
    const data = await db.getAll();
    setPersons(data);
    setVisiblePeople({ filter: "", list: data });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const showNotification = (newNotification) => {
    setNotification(newNotification);
    setTimeout(() => {
      setNotification({});
    }, 5000);
  }

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

  const cleanInput = () => {
    setNewName("");
    setNewPhone("");
  };

  const updateContacts = (person) => {
    setPersons([...persons, person]);
    setVisiblePeople({
      filter: "",
      list: [...persons, person],
    });
  };

  const updateNumber = async (contact) => {
    let updatedContact = { ...contact, number: newPhone };
    const {cancel, savedContact} = await db.update(updatedContact);
    if (cancel) return;
    const updateList = (list) =>
      list.map((person) =>
        person.id !== savedContact.id ? person : savedContact
      );
    setPersons(updateList(persons));
    setVisiblePeople({
      ...visiblePeople,
      list: updateList(visiblePeople.list),
    });
    cleanInput();
    showNotification({message: "Phone number changed", type: "message"});
  };

  const addContact = async (event) => {
    event.preventDefault();
    const existingContact = nameRepeats(newName, persons);
    if (existingContact) return updateNumber(existingContact);
    const newPerson = { name: newName, number: newPhone };
    const fullPerson = await db.create(newPerson);
    cleanInput();
    updateContacts(fullPerson);
    showNotification({message: `${fullPerson.name} added to contacts`, type: "message"});
  };

  const filterOutContact = ({ id }) => {
    const removeContact = (contacts) =>
      contacts.filter((contact) => contact.id !== id);
    setPersons(removeContact(persons));
    setVisiblePeople({
      ...visiblePeople,
      list: removeContact(visiblePeople.list),
    });
  };

  const deleteContact = async (contact) => {
    const {cancel} = await db.delContact(contact);
    if (cancel) return;
    filterOutContact(contact);
    showNotification({message: `${contact.name} removed from contacts`, type: "message"});
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
      <Notification notification={notification}/>
      <Filter value={visiblePeople.filter} handleChange={handleFilterChange} />
      <h2>Add new contacts</h2>
      <AddContactForm handleSubmit={addContact} inputData={inputData} />
      <h2>Numbers</h2>
      <Display contacts={visiblePeople.list} handleDelete={deleteContact} />
    </div>
  );
};

export default App;
