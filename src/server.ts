import app from "./app.js";
import { PORT } from "./config/env.js";
import { connectDB } from "./config/mongodb.js";

app.listen(PORT, async () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);

  console.log(`API docs available at http://localhost:${PORT}/api-docs`);

  await connectDB();
});
