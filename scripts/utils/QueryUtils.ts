import axios from 'axios';

export const useQueryFetch = (queryKeys: string[], apiEndpoint: string, params: {}, enabled: boolean) => {
  return {
    queryKey: queryKeys,
    queryFn: () =>
      axios
        .get(apiEndpoint, {
          params: params,
        })
        .then((res) => res.data),
    enabled: enabled,
  };
};
