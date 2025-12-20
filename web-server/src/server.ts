import express from "express";
import { createProducer } from "./kafka/kafka.producer"; // your existing producer file
import { WebController } from "./controllers/web.controller";
import { buildWebRoutes } from "./routes/web.route";

const PORT = Number(process.env.PORT || 8081);
const KAFKA_BROKERS = (process.env.KAFKA_BROKERS || "localhost:9092").split(",");
const KAFKA_TOPIC = process.env.KAFKA_TOPIC || "purchases";
const CUSTOMER_API_BASE_URL = process.env.CUSTOMER_API_BASE_URL || "http://localhost:8080";

async function main() {
  const app = express();
  app.use(express.json());

  const producer = createProducer(KAFKA_BROKERS);
  await producer.connect();

  const controller = WebController.create({
    producer,
    topic: KAFKA_TOPIC,
    customerApiBaseUrl: CUSTOMER_API_BASE_URL,
  });

  app.use(buildWebRoutes(controller));

  app.listen(PORT, () => console.log(`web-server listening on :${PORT}`));
}

main().catch((err) => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});