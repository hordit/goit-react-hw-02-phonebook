import { Contact } from "components/Contact/Contact"

export const ContactList = ({contacts, onDelete}) => {
    return (
        <ul>
            {contacts.map(contact => (
                <li key={contact.id}>
                    <Contact contact={contact} onDelete={onDelete}/>
                </li>
            ))}
        </ul>
    );
};