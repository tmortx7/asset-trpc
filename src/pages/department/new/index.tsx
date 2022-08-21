import { Field, Form, Formik, FormikHelpers } from "formik";
import { NextPage } from "next";
import Head from "next/head";
import router from "next/router";
import { trpc } from "../../../utils/trpc";

interface Values {
  companyId: string;
  name: string;
  description: string;
}

const CreateDepartmentPage: NextPage = () => {
  const mutation = trpc.useMutation(["departments.createDepartment"]);
  const { data, isLoading } = trpc.useQuery(["companies.companies"]);
  if (isLoading) {
    return <p> Loading...</p>;
  }

  return (
    <div>
      <Formik
        initialValues={{ companyId: "", name: "", description: "" }}
        onSubmit={async (values: Values) => {
          await mutation.mutate({
            companyId: values.companyId,
            name: values.name,
            description: values.description!,
          });
          router.push("/department");
        }}
      >
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
          <Head>
            <title>Create Department</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
            <h2 className="text-2xl font-bold">Create Department</h2>
            <Form className="grid grid-cols-1 gap-2 align-center">
              <div className="form-control">
                <label className="label" htmlFor="player1">
                  <span className="label-text">Company</span>
                </label>
                <Field
                  as="select"
                  name="companyId"
                  className="input input-bordered w-full max-w-xs"
                >
                  {/* <option disabled value="">
                    (Select a company)
                  </option> */}
                  {data?.map((companyx: any) => (
                    <option value={companyx.id}>{companyx.name}</option>
                  ))}
                </Field>
              </div>
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
          </main>
        </div>
      </Formik>
    </div>
  );
};

export default CreateDepartmentPage;
