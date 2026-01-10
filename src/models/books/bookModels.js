import book from "./bookSchema.js";

//insert the new book 
export const createNewBook =(bookObj) =>{
    return new book(bookObj).save();
};

//getting all the books from db
export const getAllPublicBooks = (filter) =>{
    return book.findOne(filter)
}

//