import { Contact } from '../db/models/contact.js';

export const getAllContacts = async () => {
    const contacts = await Contact.find();
    return contacts;
  };


  export const getContactById = async (id) => {
    const contact = await Contact.findById(id);
    return contact;
  };

  export const createContact = async (data) => {
   const contact = await Contact.create(data);
   return contact;
  };

  export const patchContactById = async (id, data) => {
    const contact = await Contact.findByIdAndUpdate(id, data, {new: true });

    return contact;
    };

  export const deleteContactById = async (id) => {
    const contact = Contact.findByIdAndDelete(id);
    return contact;
  };