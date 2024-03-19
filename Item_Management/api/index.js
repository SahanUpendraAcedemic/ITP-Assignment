import express from "express";

const app=express();

app.listen(3000,() => {
    console.log('Server listing to port 3000')
})