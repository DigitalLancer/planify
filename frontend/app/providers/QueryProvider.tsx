"use client"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { useState } from "react"

interface Props {
    children: React.ReactNode
}

function QueryProvider({ children }: Props) {
    const [queryClient] = useState(() => new QueryClient())
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}

export default QueryProvider