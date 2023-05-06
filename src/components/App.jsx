import { Component } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { Layout } from "./Layout";
import contacts from "./Data/Contacts.json"
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";


const INITIAL_STATE = {
  contacts: [],
  filter: '',
}
export class App extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    this.setState({ contacts });
  }

  addContact = newContact => {
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      }
    });
  };

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== contactId),
      }
    });
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = ({ contacts, filter }) => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({name, number}) => name.toLowerCase().includes(normalizedFilter) || number.toLowerCase().includes(normalizedFilter));
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts(this.state);

    return (
      <Layout >
        <h1>Phonebook</h1>
        <ContactForm onAdd={this.addContact} />
        <Filter value={filter} onChange={this.changeFilter} />
        <h2>Contacts</h2>
        <ContactList contacts={visibleContacts} onDelete={this.deleteContact} />
      </Layout>
    )
  };
};


