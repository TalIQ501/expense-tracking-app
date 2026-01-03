import type { FastifyPluginAsync } from "fastify";
import { foodRoutes } from "../modules/food-expenses/food.routes";
import { transportRoutes } from "../modules/transport-expenses/transport.routes";
import { generalRoutes } from "../modules/general-expenses/general.routes";
import { clothesRoutes } from "../modules/clothes-expenses/clothes.routes";
import { groceryRoutes } from "../modules/grocery-expenses/grocery.routes";
import { stationaryRoutes } from "../modules/stationary-expenses/stationary.routes";

export const apiPlugin: FastifyPluginAsync = async (app) => {
  await app.register(generalRoutes, { prefix: "/general" });
  await app.register(foodRoutes, { prefix: "/food" });
  await app.register(transportRoutes, { prefix: "/transport" });
  await app.register(groceryRoutes, { prefix: "/grocery" });
  await app.register(clothesRoutes, { prefix: "/clothes" });
  await app.register(stationaryRoutes, { prefix: "/stationary" });
};
