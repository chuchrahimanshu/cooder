// Import Section
import { app } from "./app.js";

// Listening Server
app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(`ERROR 💥 - Running on PORT: ${process.env.PORT}`);
  }
  console.log(
    `SUCCESS 🚀 - Server is running at http://localhost:${process.env.PORT}`
  );
});
