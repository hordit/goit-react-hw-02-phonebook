import { Component } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { Layout } from "./Layout";
import contacts from "./Data/Contacts.json"
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { GlobalStyle } from "./GlobalStyles";


const INITIAL_STATE = {
  contacts: [],
  filter: '',
}
export class App extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    this.setState({ contacts });
  };

  capitalizedName(str) {
   return (typeof str !== 'string') 
   ? '' 
   : str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  };

  addContact = newContact => {
    const isNameExsist = this.state.contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    const normalizedName = { ...newContact, name: this.capitalizedName(newContact.name),
    };

    (isNameExsist) ? alert(`${this.capitalizedName(newContact.name)} is already in contacts.`) : this.setState(prevState => ({
      contacts: [...prevState.contacts, normalizedName],
    }));
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
        <GlobalStyle />
        <h1>Phonebook</h1>
        <ContactForm onAdd={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList contacts={visibleContacts} onDelete={this.deleteContact} />
      </Layout>
    )
  };
};


