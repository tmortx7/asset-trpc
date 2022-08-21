import * as z from "zod";

export const departmentSchema = z.object({
  companyId: z.string(),
  name: z.string(),
  description: z.string(),
});

export const editDepartmentSchema = z.object({
  id: z.string(),
  companyId: z.string(),
  name: z.string(),
  description: z.string(),
});



export type IDepartment = z.infer<typeof departmentSchema>;
export type IEditDepartment = z.infer<typeof editDepartmentSchema>;

export const getSingleDepartmentSchema = z.object({
  departmentId: z.string(),
})