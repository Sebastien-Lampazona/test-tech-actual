import {
    QueryClient,
} from '@tanstack/react-query'

export default new QueryClient({
    defaultOptions: {
        mutations: {
            networkMode: 'offlineFirst',
        }
    }
});
