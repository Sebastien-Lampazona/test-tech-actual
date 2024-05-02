import { useMutation } from "@tanstack/react-query"
import type { Candidat } from "@alTypes/Candidats";
import axiosFetch from "@commons/axiosFetch";
import queryClient from "@commons/queryClient";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";

export default () => useMutation({
    mutationFn: (candidat: Candidat) => axiosFetch.post(`/users`, candidat).then(({ data }) => data.data as Candidat),
    // When mutate is called:
    onMutate: async (candidat) => {
        // Cancel any outgoing refetches
        // (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({ queryKey: ['candidats'] })

        // Snapshot the previous value
        const previousCandidats = queryClient.getQueryData(['candidats']) as Candidat[];

        // Optimistically update to the new value
        queryClient.setQueryData(['candidats'], (cachedCandidats: Candidat[]) => {
            return [...(cachedCandidats || []), candidat]
        })


        // Return a context object with the snapshotted value
        return { previousCandidats }
    },
    onSuccess(candidat) {
        // Optimistically update to the new value
        queryClient.setQueryData(['candidats', candidat.id], candidat);
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (error: AxiosError) => {
        const errorDetail = error?.response?.data as { message: string } | undefined;
        enqueueSnackbar(`Erreur lors de la création du candidat${errorDetail?.message ? ` : ${errorDetail.message}` : ''}`, { variant: 'error' });
    },
    // Always refetch after error or success:
    onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['candidats'] })
    },
})
