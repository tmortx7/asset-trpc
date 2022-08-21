import type { NextPage } from "next";
import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import { trpc } from "../../utils/trpc";
import router from "next/router";
import { IDepartment } from "../../schema/department.schema";

const DepartmentListPage: NextPage = () => {

  const {data} = trpc.useQuery(["departments.getAll"]);

  return (
    <div>
      <Head>
        <title>List of Departments</title>
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
                  <th>company</th>
                  <th>edit</th>
                </tr>
              </thead>
              <tbody>
                {data?.map(({ id, name, description,departments }) => (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{description}</td>
                    <td>value</td>
                    <td><Link href={`/department/edit/${id}`}>edit</Link></td>
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

export default DepartmentListPage;