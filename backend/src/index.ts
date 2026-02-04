import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL })); // to everyone to send requests, but I need to specify my frontend URL
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to parse form data || to get the data by saying req.body

app.get("/", (req, res) => {
  // instead of this res.send('Hello World!'); I need to have a message with endpoints to owners, customer and admin
  res.json({
    message: "Welcome to the Foundric API",
    endpoints: {
      owners: "/api/owners",
      customers: "/api/customers",
      admin: "/api/admin",
    },
  });
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
