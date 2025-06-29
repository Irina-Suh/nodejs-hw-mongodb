import { Contact } from '../db/models/contact.js';

export const getAllContacts = async () => {
    const contacts = await Contact.find();
    return contacts;
  };


  export const getContactById = async (id) => {
    const contact = await Contact.findById(id);
    return contact;
  };

  export const createContact = async (payload) => {
    return Contact.create(payload);
  };

  export const patchContactById = async (id, payload) => {
    const contact =  Contact.findByIdAndUpdate(id, payload, {new: true, });
    if (!contact || !contact.value) return null;

    return contact;
    };

  export const deleteContactById = async (id) => {
    const contact = Contact.findByIdAndDelete(id);
    return contact;
  };