import * as z from "zod";

export const companySchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const editCompanySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});



export type ICompany = z.infer<typeof companySchema>;

export const getSingleCompanySchema = z.object({
  companyId: z.string(),
})