import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config';
import UserRoute from "./routes/UserRoute";

const app = express();



mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Connected to MongoDB!"));
  
app.use(cors());
app.use(express.json());

app.use("/api/user", UserRoute);


app.get("/test", (req:Request, res:Response) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
