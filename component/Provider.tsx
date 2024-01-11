import React, {PropsWithChildren, useState} from 'react';
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";

const Provider = ({children}: PropsWithChildren) => {
    const [queryClient ] = useState(new QueryClient(
        {
            defaultOptions:{
                queries:{
                    refetchOnWindowFocus: false
                }
            }
        }
    ))
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default Provider;