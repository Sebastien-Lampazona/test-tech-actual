import { Candidat } from "@alTypes/Candidats";
import axiosFetch from "@commons/axiosFetch";
import { useQuery } from "@tanstack/react-query";

export default (candidatId: number) => useQuery({
    queryKey: ['candidats', candidatId],
    queryFn: () => axiosFetch.get(`/users/${candidatId}`).then(({ data }) => (data.data || null) as Candidat | null)
});
