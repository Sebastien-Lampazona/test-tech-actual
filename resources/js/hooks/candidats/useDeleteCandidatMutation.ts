import { useMutation } from "@tanstack/react-query"
import type { Candidat } from "@alTypes/Candidats";
import axiosFetch from "@commons/axiosFetch";
import queryClient from "@commons/queryClient";
import { enqueueSnackbar } from "notistack";

export default () => useMutation({
    mutationFn: (candidat: Candidat) => axiosFetch.delete(`/users/${candidat.id}`),
    // When mutate is called:
    onMutate: async (candidatToRemove) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['candidats'] })

      // Snapshot the previous value
      const previousCandidats = queryClient.getQueryData(['candidats'])

      // Optimistically update to the new value
      queryClient.setQueryData(['candidats'], (cachedCandidats: Candidat[]) => cachedCandidats.filter(c => c.id !== candidatToRemove.id))

      // Return a context object with the snapshotted value
      return { previousCandidats }
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (error) => {
        console.error(error);
        enqueueSnackbar('Erreur lors de la suppression du candidat', { variant: 'error' });
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['candidats'] })
    },
  })
