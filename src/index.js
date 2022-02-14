import "./env.js";
import { fastify } from "fastify";
import fastifyStatic from "fastify-static";
import path from "path";
import { fileURLToPath } from "url";
import { connectDb } from "./db.js";
import { registerUser } from "./accounts/register.js";

//esm bugs
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = fastify();

async function startApp() {
  try {
    app.register(fastifyStatic, {
      root: path.join(__dirname, "public"),
    });

    app.post("/api/register", {}, async (req, res) => {
      try {
        const userId = await registerUser(req.body.email, req.body.password);
        console.log(userId);
      } catch (err) {
        console.log(err);
      }
    });

    await app.listen(3000);
  } catch (e) {
    console.log(e);
  }
}

connectDb()
  .then(() => startApp())
  .catch((err) => console.log(err));
