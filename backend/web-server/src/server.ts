import { createApp } from "./app";

/**
 * ENV configuration
 *
 * The server port is provided via an environment variable
 * to support flexible deployment across environments
 * (local development, Kubernetes, CI/CD).
 */
const PORT = Number(process.env.PORT || 8080);

/**
 * Application entry point.
 *
 * Initializes the Web Server application and starts
 * listening for incoming HTTP requests.
 */
async function main() {
  const app = await createApp();
  app.listen(PORT, () => console.log(`web-server listening on :${PORT}`));
}


/**
 * Global startup error handling.
 *
 * Ensures that the process exits immediately if a critical
 * failure occurs during application initialization,
 * preventing the service from running in an inconsistent state.
 */
main().catch((err) => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});