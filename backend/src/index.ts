import { buildApp } from "./app";

const start = async () => {
  const app = await buildApp();

  try {
    await app.listen({ port: app.config.PORT });
  } catch (err) {
    app.log.error(err);
  }
};

start();
