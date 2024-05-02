import { Candidat } from "@alTypes/Candidats";
import axiosFetch from "@commons/axiosFetch";
import { useQuery } from "@tanstack/react-query";

export default () => useQuery({
    queryKey: ['candidats'],
    queryFn: () => axiosFetch.get('/users', {
        params: {
            role: 'candidate'
        }
    }).then(({ data }) => (data.data || []) as Candidat[])
});
