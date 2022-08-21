import { createRouter } from "../createRouter";
import { userRouter } from "./user.router";
import { companyRouter } from "./company.router";
import { departmentRouter } from "./department.router";

export const appRouter = createRouter()
  .merge("users.", userRouter)
  .merge("companies.", companyRouter)
  .merge("departments.", departmentRouter);

export type AppRouter = typeof appRouter;
