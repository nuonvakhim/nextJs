"use client"

import React from 'react';
import {Props} from "next/script";
import {QueryClientProvider, useQuery} from "@tanstack/react-query";
import {QueryClient} from "@tanstack/query-core";

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
                .then((res)=>res.json(),
                ),
    })
    console.log("data",data)
    if (isPending) return 'Loading....'
    if (error) return 'An error has occurred: '+ error.message
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <th>
                        Student ID
                    </th>
                    <th>
                        Student Name
                    </th>
                    <th>
                        Department
                    </th>
                    {data.map((item: any, key: any) => (
                        <tr key={key}>
                            <td>{item.studentId}</td>
                            <td>{item.studentName}</td>

                            </tr>
                    ))}
                    </thead>

                </table>
            </div>
        </div>
    )
}

export default UserPage;