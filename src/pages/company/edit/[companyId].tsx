import { useRouter } from "next/router";
import { companySchema, ICompany } from "../../../schema/company.schema";
import { trpc } from "../../../utils/trpc";
import Error from "next/error";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { NextPage } from "next";

interface Values {
  name: string;
  description: string;
}

const EditCompanyPage: NextPage = () => {
  const router = useRouter();
  const { mutate, error } = trpc.useMutation(["companies.editCompany"]);
  const companyId = router.query.companyId as string;

  const { data, isLoading } = trpc.useQuery([
    "companies.single-company",
    { companyId },
  ]);

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  if (!data) {
    return <Error statusCode={404} />;
  }
  return (
    <div>
      <Formik
        initialValues={{ name: data.name, description: data.description! }}
        onSubmit={async (values: ICompany) => {
          await mutate({
            id: companyId,
            name: values.name,
            description: values.description!,
          });
          router.push("/company");
        }}
      >
        <div className="flex min-h-screen justify-center items-center">
          <div className="py-20">
            <h2 className="text-2xl font-bold">Edit Company</h2>
            <Form className="grid grid-cols-1 gap-2 align-center">
              <div className="form-control">
                <label className="label" htmlFor="name">
                  <span className="label-text">Name</span>
                </label>
                <Field
                  className="input input-bordered w-full max-w-xs"
                  id="name"
                  name="name"
                  placeholder="John"
                  autoComplete="off"
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="description">
                  <span className="label-text">Description</span>
                </label>
                <Field
                  className="input input-bordered w-full max-w-xs"
                  id="description"
                  name="description"
                  placeholder="John"
                  autoComplete="off"
                />
              </div>

              <button className="btn w-full max-w-xs mt-2" type="submit">
                Submit
              </button>
            </Form>
          </div>
        </div>
      </Formik>
    </div>
  );
};

export default EditCompanyPage;
