import mongoose from "mongoose";
import { createApp } from "./app";
import { startConsumer } from "./kafka/kafka.consumer";

const PORT = Number(process.env.PORT || 8080);
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/purchases";
const KAFKA_BROKERS = (process.env.KAFKA_BROKERS || "localhost:9092").split(",");
const KAFKA_TOPIC = process.env.KAFKA_TOPIC || "purchases";
const KAFKA_GROUP_ID = process.env.KAFKA_GROUP_ID || "customer-api-v1";

async function main() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB:", MONGO_URI);

  await startConsumer({ brokers: KAFKA_BROKERS, topic: KAFKA_TOPIC, groupId: KAFKA_GROUP_ID });
  console.log("Kafka consumer started.");

  const app = createApp();
  app.listen(PORT, () => console.log(`customer-api listening on :${PORT}`));
}

main().catch((err) => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});