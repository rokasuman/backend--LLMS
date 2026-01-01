import bookSchema from "./bookSchema";

//insert the new book 
export const createNewBook =(bookObj) =>{
    return bookSchema(bookObj).save();
}
