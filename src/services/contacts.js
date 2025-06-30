import { Contact } from '../db/models/contact.js';

export const getAllContacts = async ({ page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc', }) => {
    const skip = (page - 1) * perPage;
    const sortDirection = sortOrder === 'desc' ? -1 : 1;

    const totalItems = await Contact.countDocuments();
    const totalPages = Math.ceil(totalItems / perPage);


    const contacts = await Contact.find()
    .sort({ [sortBy]: sortDirection })
    .skip(skip)
    .limit(perPage);
    return {
      data: contacts,
      page: Number(page),
      perPage: Number(perPage),
      totalItems,
      totalPages,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
    };
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
