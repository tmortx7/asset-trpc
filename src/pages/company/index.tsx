import type { NextPage } from "next";
import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import { trpc } from "../../utils/trpc";

const CompanyListPage: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["companies.companies"]);
  if (isLoading) {
    return <p> Loading...</p>;
  }

  return (
    <div>
      <Head>
        <title>List of Companies</title>
        <meta name="description" content="companies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex items-center justify-center h-screen w-full">
          <div className="overflow-x-auto">
            <table className="table table-compact w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Departments</th>
                  <th>edit</th>
                </tr>
              </thead>
              <tbody>
                {data?.map(({ id, name, description, departments }) => (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{description}</td>
                    <td>value</td>
                    <td><Link href={`/company/edit/${id}`}>edit</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyListPage;
