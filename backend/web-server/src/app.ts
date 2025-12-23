import express from "express";
import { buildWebRoutes } from "./routes/web.route";
import { WebController } from "./controllers/web.controller";
import { createProducer } from "./kafka/kafka.producer";
import path from "path";

/**
 * ENV configuration
 *
 * All configuration values are provided via environment variables
 * to support different deployment environments (local, Kubernetes, CI/CD).
 */
const KAFKA_BROKERS = (process.env.KAFKA_BROKERS || "localhost:9092").split(",");
const KAFKA_TOPIC = process.env.KAFKA_TOPIC || "purchases";
const CUSTOMER_API_BASE_URL = process.env.CUSTOMER_API_BASE_URL || "http://localhost:8080";

/**
 *  Web Server
 *
 * Creates and configures the Express application instance
 * for the user-facing Web Server service.
 *
 * This function initializes:
 * 1. Kafka producer (for publishing purchase events)
 * 2. Web controllers with injected dependencies
 * 3. Static React frontend
 * 4. HTTP routes exposed to end users
 */
export async function createApp() {
  const app = express();
  app.use(express.json());

  /**
   * Initialize Kafka producer.
   *
   * The Web Server publishes purchase events to Kafka instead
   * of writing directly to the database, enabling asynchronous
   * and decoupled processing.
   */
  const producer = createProducer(KAFKA_BROKERS);
  await producer.connect();

  /**
   * Create Web Controller with injected dependencies.
   *
   * Dependency injection is used to avoid global state and
   * allow flexible configuration across environments.
   */  
  const controller = WebController.create({
    producer,
    topic: KAFKA_TOPIC,
    customerApiBaseUrl: CUSTOMER_API_BASE_URL,
  });

  app.use(buildWebRoutes(controller));
  return app;
}