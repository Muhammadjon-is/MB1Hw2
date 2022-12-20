import express, { json } from "express";

const booksRouter = express.Router();

// Geting user json path
 const booksJsonPath = join(dirname(fileURLToPath(import.meta.url)), "Book.json")  
import fs from 'fs'
import { dirname, join } from "path";
import { fileURLToPath} from "url"
import uniqid from "uniqid"
console.log( "it is working " ,booksJsonPath);
console.log("current path:", import.meta.url);



//!Postman 



// ! get http://localhost:3002/books/
booksRouter.get("/", (request, response) => {
    const fileContent =  fs.readFileSync(booksJsonPath)
    console.log("it is file content", fileContent);
    const booksArray = JSON.parse(fileContent)
    console.log("file content ", booksArray);
  response.send(fileContent);
});

// ! get http://localhost:3002/books/booksId
booksRouter.get("/:booksId", (request, response) => {
    const booksId = request.params.booksId
    const usersArray = JSON.parse(fs.readFileSync(booksJsonPath))
    const book = usersArray.find(book =>  book.id === booksId)

     response.send(book)
//   response.send({ message: "Hello here is  singleGet the usingIdbook", booksId });
});

// ! Post http://localhost:3002/books/
booksRouter.post("/", (request, response) => {
    console.log("request body:", request.body);
    const newbook = {...request.body, createdAt: new Date(), updatedAt: new Date(),  id: uniqid()}
    const usersArray = JSON.parse(fs.readFileSync(booksJsonPath))
    usersArray.push(newbook)
    fs.writeFileSync(booksJsonPath, JSON.stringify(usersArray))
       
      response.send({ message: "Hello here is post the book" });
  });

//! put http://localhost:3002/books/booksId
booksRouter.put("/:booksId", (request, response) => {
    const usersArray = JSON.parse(fs.readFileSync(booksJsonPath))
 const  index = usersArray.findIndex (book => book.id === request.params.booksId)
 const oldBook = usersArray[index]
 const updatedBook = {...oldBook, ...request.body , updatedAt: new Date()}
 usersArray[index]= updatedBook
 fs.writeFileSync(booksJsonPath, JSON.stringify(usersArray))
  response.send(updatedBook);
});

//! delete  http://localhost:3002/books/booksId
booksRouter.delete("/:booksId", (request, response) => {
    const usersArray = JSON.parse(fs.readFileSync(booksJsonPath))
    const remaingBooks = usersArray.filter(books => books.id === request.params.userId);
    fs.writeFileSync(booksJsonPath, JSON.stringify(remaingBooks))
    response.send()
//   response.send({ message: "Hello here is delete the usingIdbook" });
});

booksRouter.get("/smth");

export default booksRouter;
