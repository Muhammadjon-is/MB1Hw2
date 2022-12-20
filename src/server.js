import express from "express"
import listEndPoits from "express-list-endpoints"
 import booksRouter from "./api/index.js"
const server = express()
const port = 3002

server.use(express.json())
server.use("/books", booksRouter)

server.listen(port, () => {
    console.table(listEndPoits(server))
    console.log(`server is runnning`, port);
})
