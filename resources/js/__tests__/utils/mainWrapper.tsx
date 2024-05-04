import queryClient from "@commons/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";

export default function MainWrapper({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <SnackbarProvider />
            <MemoryRouter>
                {children}
            </MemoryRouter>
        </QueryClientProvider>
    );
}
