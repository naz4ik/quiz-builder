"use strict";
import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";
import { router as quizRouter } from "./src/routes/quiz.router.js";

const PORT = process.env.PORT || 3005;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);
app.use("/quizzes", quizRouter);

app.get("/", (req, res) => {
  res.send("Server is OK");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log("server is running");
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.roomId = null;

  ws.on("message", (data) => {
    try {
      const parsed = JSON.parse(data);

      if (parsed.type === "join" && parsed.roomId) {
        ws.roomId = parsed.roomId;
      }
    } catch (error) {
      console.error("Invalid message from client", error);
    }
  });
});
