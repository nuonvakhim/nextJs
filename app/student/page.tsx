"use client"

import React from 'react';
import {Props} from "next/script";
import {QueryClientProvider, useMutation, useQuery} from "@tanstack/react-query";
import {QueryClient} from "@tanstack/query-core";
interface Department {
    departmentId: number;
    departmentName: string;
    departmentCode: string;
    departmentAddress: string;
}

const queryClient = new QueryClient();
const UserPage = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <Student/>
        </QueryClientProvider>
    );
};
function Student(){
    const {isPending, error, data}= useQuery({
        queryKey:['repoData'],
        queryFn:()=>
            fetch('http://localhost:8080/api/v1/student')
                .then((res)=>res.json(),),
    });


    console.log("data",data)
    if (isPending) return 'Loading....'
    if (error) return 'An error has occurred: '+ error.message

    return (
        <div>
            <form className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label

                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Student Name
                    </label>
                    <input

                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="Student Name"
                    />
                </div>
                <div className="mb-5">
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                        Department ID
                    </label>
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    />
                </div>

                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                    Submit
                </button>
            </form>

            <div className="overflow-x-auto ">
                <label className="swap swap-flip text-9xl">

                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox"/>

                    <div className="swap-on">😈</div>
                    <div className="swap-off">😇</div>
                </label>


            </div>
            <table className="table ">
                {/* head */}
                <thead className="">
                <th className="  border-b-red-400 border-4">Student ID</th>
                <th className="border-b-red-400 border-4">Student Name</th>
                <th className="border-b-red-400 border-4">Department ID</th>
                <th className="border-b-red-400 border-4">Department Name</th>
                <th className="border-b-red-400 border-4">Department Code</th>
                <th className="border-b-red-400 border-4">Department Address</th>
                {data.map((item: { studentId: string, studentName: string, department: Department }, key: any) => (
                    <tr key={key}>
                        <td>{item.studentId}</td>
                        <td>{item.studentName}</td>
                        <td>{item.department.departmentId}</td>
                        <td>{item.department.departmentName}</td>
                        <td>{item.department.departmentCode}</td>
                        <td>{item.department.departmentAddress}</td>
                    </tr>
                ))}
                </thead>
            </table>
        </div>
    )
}
export default UserPage;