import { useQuery } from '@tanstack/react-query';

export type Breed = {
  breed: string;
  country: string;
  origin: string;
  coat: string;
  pattern: string;
};

type ApiResponse = {
  current_page: number;
  data: Breed[];
  last_page: number;
  per_page: number;
  total: number;
};

const fetchBreedsPage = async (page = 1): Promise<ApiResponse> => {
  const res = await fetch(`https://catfact.ninja/breeds?page=${page}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

// v5 uses the object-style call signature: useQuery({ queryKey, queryFn, ...options })
export function useBreedsPage(page: number) {
  // Note: keepPreviousData isn't available in the project's react-query typings/version.
  // You can emulate it by keeping the previous page's data in UI state if needed.
  return useQuery({ queryKey: ['breeds', page], queryFn: () => fetchBreedsPage(page) });
}
