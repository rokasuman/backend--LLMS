import { responseClient } from "../middleware/responseClient.js";
import { createNewBook, getAllPublicBooks} from "../models/books/bookModels.js";
import slug from "slugify"
// controller to insert the books in table and later will be passed to server

export const insertBooks = async (req, res, next) => {
  try {
    const { fName, _id } = req.userInfo;

    const obj = {
      ...req.body,
      slug : slugify(req.body.title,{lower:true}),
      addBy: { name: fName, adminId: _id },
      lastUpdatedBy: { name: fName, adminId: _id }, 
    };

    console.log("Book object to save:", obj);

    const book = await createNewBook(obj);
    console.log("Saved book:", book);
     
    return res.json({
      status:"success",
      message:"Book added Successfully."
    })

  } catch (error) {
    console.error("Error inserting book:", error.message);
      if(error.message.includes("E11000 duplicate key")){
      error.message = "Duplicate slug is not allowed, Please change your book title and try again!"
    }
    next(error);
  }
};

//controller for all the public api
export const getAllBooksController = async (req,res,next) =>{
  try {
    const payload= await getAllPublicBooks()
    responseClient({
      req,
      res,
      payload,
      message:"The book has been added Successfully."
    })
  } catch (error) {
  
    next(error)
  }
}