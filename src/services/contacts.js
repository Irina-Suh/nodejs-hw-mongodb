import { Contact } from '../db/models/contact';

export const getAllContactsService = async () => {
    const contacts = await Contact.find();
    return contacts;
};

export const getContactByIdService = async (id) => {
    const contact = await Contact.findById(id);
    return contact;
};

export const createContactService = async (contactData) => {
    const contact = await Contact.create(contactData);
    return contact;
};

export const updateContactService = async (id, updateData) => {
    const updatedContact = await Contact.findByIdAndUpdate(id, updateData, {
        new: true,
    });
    return updatedContact;
};

export const deleteContactService = async (id) => {
    const deletedContact = await Contact.findByIdAndDelete(id);
    return deletedContact;
};