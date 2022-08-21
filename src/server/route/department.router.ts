import * as trpc from "@trpc/server";
import { z } from "zod";

import {
  departmentSchema,
  editDepartmentSchema,
  getSingleDepartmentSchema,
} from "../../schema/department.schema";
import { createRouter } from "../createRouter";

export const departmentRouter = createRouter()
  .mutation("editDepartment", {
    input: editDepartmentSchema,
    async resolve({ input, ctx }) {
      return await ctx.prisma.department.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });
    },
  })

  .query("departments", {
    resolve({ ctx }) {
      return ctx.prisma.department.findMany();
    },
  })
  .query("single-department", {
    input: getSingleDepartmentSchema,
    resolve({ input, ctx }) {
      return ctx.prisma.department.findUnique({
        where: {
          id: input.departmentId,
        },
      });
    },
  })


  .mutation("createDepartment", {
    input: departmentSchema,
    resolve: async ({ input, ctx }) => {
      const { companyId, name, description } = input;

      const exists = await ctx.prisma.department.findFirst({
        where: { name },
      });

      if (exists) {
        throw new trpc.TRPCError({
          code: "CONFLICT",
          message: "department already exists.",
        });
      }

      const result = await ctx.prisma.department.create({
        data: { companyId, name, description },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: result.name,
      };
    },
  });
