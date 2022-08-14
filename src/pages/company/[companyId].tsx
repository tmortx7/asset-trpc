import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { companySchema, ICompany } from "../../schema/company.schema";
import { trpc } from "../../utils/trpc";
import Error from "next/error";
import { Formik } from "formik";

function EditCompanyPage() {
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

  //

  return (
    <div>
      <Formik
        initialValues={{ name: data.name, description: data.description! }}
        onSubmit={async (values:ICompany) => {
          await mutate({
            id: companyId,
            name: values.name,
            description: values.description!,
          });
          router.push("/company");
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form
            className="flex items-center justify-center h-screen w-full "
            onSubmit={handleSubmit}
          >
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Edit company</h2>
                <input
                  type="text"
                  id="name"
                  className="input input-bordered w-full max-w-xs"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />

                <label htmlFor="description">
                  Description{" "}
                  <span>
                    {errors.description &&
                      touched.description &&
                      errors.description}
                  </span>
                </label>
                <input
                  type="text"
                  id="description"
                  className="input input-bordered w-full max-w-xs"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />

                <button
                  className="btn btn-secondary"
                  type="submit"
                  value="Submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default EditCompanyPage;
