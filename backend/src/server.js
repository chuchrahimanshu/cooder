// Import Section
import { app } from "./app.js";
import router from "./routes/index.routes.js";

// Middleware Section
app.use("/", router);

// Listening Server
app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(`ERROR 💥 - Running on PORT: ${process.env.PORT}`);
  }
  console.log(
    `SUCCESS 🚀 - Server is running at http://localhost:${process.env.PORT}`
  );
});
