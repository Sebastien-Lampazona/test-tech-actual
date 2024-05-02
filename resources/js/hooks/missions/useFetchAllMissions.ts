import { Mission } from "@alTypes/Missions";
import axiosFetch from "@commons/axiosFetch";
import { useQuery } from "@tanstack/react-query";

export default () => useQuery({
    queryKey: ['missions'],
    queryFn: () => axiosFetch.get('/missions').then(({ data }) => (data.data || []) as Mission[])
});
