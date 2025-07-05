import { Contact } from '../db/models/contact.js';

export const getAllContacts = async ({ page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
  userId,}) => {
    const skip = (page - 1) * perPage;
    const sortDirection = sortOrder === 'desc' ? -1 : 1;
    const filter = { userId: userId };

    const totalItems = await Contact.countDocuments();
    const totalPages = Math.ceil(totalItems / perPage);


    const contacts = await Contact.find(filter)
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


  export const getContactById = async (id, userId) => {
    const contact = await Contact.findById({id, userId: userId} );
    return contact;
  };

  export const createContact = async (data, userId) => {
   const contact = await Contact.create({ ...data, userId: userId });
   return contact;
  };

  export const patchContactById = async (id, data, userId) => {
    const contact = await Contact.findByIdAndUpdate( { _id: id, userId: userId },
      data,
      { new: true });

    return contact;
    };

  export const deleteContactById = async (id, userId) => {
    const contact = Contact.findByIdAndDelete({ _id: id, userId: userId });
    return contact;
  };
