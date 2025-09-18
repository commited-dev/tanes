import app from "./app.ts";
import { PORT } from "./config/env.ts";
import { connectDB } from "./config/mongodb.ts";

app.listen(PORT, async () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);

  await connectDB();
});
