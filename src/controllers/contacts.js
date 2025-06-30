import { createContact, deleteContactById, getAllContacts, getContactById, patchContactById } from '../services/contacts.js';
import createHttpError from 'http-errors';


export const handleGetAllContacts = async (req, res, next) => {


    const { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc' } = req.query;

    const result = await getAllContacts({
      page: Number(page),
      perPage: Number(perPage),
      sortBy,
      sortOrder,
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: result,
    });

};

export const handleGetContactById = async (req, res, next) => {

    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {

      throw createHttpError(404, 'Contact not found');

    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });

};




export const createContactController = async (req, res) => {
  const newContact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: newContact,
  });
};


export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const updatedData = req.body;

  const updatedContact = await patchContactById(contactId, updatedData);

  if (!updatedContact) {
    throw createHttpError(404, 'Not update');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};



export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContactById(contactId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};

