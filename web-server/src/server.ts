import { createApp } from "./app";

const PORT = Number(process.env.PORT || 8080);

async function main() {
  const app = await createApp();
  app.listen(PORT, () => console.log(`web-server listening on :${PORT}`));
}

main().catch((err) => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});