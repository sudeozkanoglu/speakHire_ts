import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./configs/db"
import { webcrypto } from "crypto";
import authRouter from "./routes/auth/authRoutes";

if (!globalThis.crypto) {
  globalThis.crypto = webcrypto as unknown as Crypto;
}

// app config 
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,               
  })
);

// db connection
connectDB();

// api endpoints
app.use("/api/auth", authRouter);


app.get("/", (req,res)=>{
    res.send("API Working")
})

app.listen(port, ()=>{
    console.log(`Server is running on port http://localhost:${port}`)
})