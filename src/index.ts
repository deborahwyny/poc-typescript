import express from "express";
import bookRoutes from "./routes/bookRoutes";

const app = express();
app.use(express.json());

app.use("/", bookRoutes);

app.listen(5000, () => {
  console.log(`Server is up and running on port 5000`);
});

