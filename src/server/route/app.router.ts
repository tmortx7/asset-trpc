import { createRouter } from "../createRouter";
import { userRouter } from "./user.router";
import { companyRouter } from "./company.router";

export const appRouter = createRouter()
  .merge("users.", userRouter)
  .merge("companies.", companyRouter);

export type AppRouter = typeof appRouter;
