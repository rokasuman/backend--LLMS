import book from "./bookSchema.js";

//insert the new book 
export const createNewBook =(bookObj) =>{
    return new book(bookObj).save();
};
