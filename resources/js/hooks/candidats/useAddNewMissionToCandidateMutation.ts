import { useMutation } from "@tanstack/react-query"
import type { Candidat } from "@alTypes/Candidats";
import axiosFetch from "@commons/axiosFetch";
import queryClient from "@commons/queryClient";

export default () => useMutation({
    mutationFn: ({ candidatId, missionId }: { candidatId: Number, missionId: Number }) => axiosFetch.put(`/users/${candidatId}/missions/${missionId}`)
        .then(({ data }) => data.data as Candidat)
    .catch((error) => {
        const errorDetail = error?.response?.data as { message: string } | undefined;
        throw new Error(errorDetail?.message || 'Erreur inconnue');
    }),
    // Always refetch after error or success:
    onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['candidats'] })
    },
})
