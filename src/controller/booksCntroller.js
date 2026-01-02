import { createNewBook } from "../models/books/bookModels.js";

export const insertBooks = async (req, res, next) => {
  try {
    const { fName, _id } = req.userInfo;

    const obj = {
      ...req.body,
      addBy: { name: fName, adminId: _id },
      lastUpdatedBy: { name: fName, adminId: _id }, 
    };

    console.log("Book object to save:", obj);

    const book = await createNewBook(obj);
    console.log("Saved book:", book);

    res.json({ message: "Book has been added" });
  } catch (error) {
    console.error("Error inserting book:", error.message);
    next(error);
  }
};
