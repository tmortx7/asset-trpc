import * as trpc from "@trpc/server";
import { z } from "zod";

import {
  companySchema,
  editCompanySchema,
  getSingleCompanySchema,
} from "../../schema/company.schema";
import { createRouter } from "../createRouter";

export const companyRouter = createRouter()
  .mutation("editCompany", {
    input: editCompanySchema,
    async resolve({ input, ctx }) {
      return await ctx.prisma.company.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });
    },
  })

  .query("companies", {
    resolve({ ctx }) {
      return ctx.prisma.company.findMany();
    },
  })
  .query("single-company", {
    input: getSingleCompanySchema,
    resolve({ input, ctx }) {
      return ctx.prisma.company.findUnique({
        where: {
          id: input.companyId,
        },
      });
    },
  })
  
  .mutation("createCompany", {
    input: companySchema,
    resolve: async ({ input, ctx }) => {
      const { name, description } = input;

      const exists = await ctx.prisma.company.findFirst({
        where: { name },
      });

      if (exists) {
        throw new trpc.TRPCError({
          code: "CONFLICT",
          message: "Company already exists.",
        });
      }

      const result = await ctx.prisma.company.create({
        data: { name, description },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: result.name,
      };
    },
  });
