const API_URL = import.meta.env.VITE_API_URL;

export type QueryParams = Record<string, string | number | boolean | undefined>;

type ApiOptions = RequestInit & {
  params?: QueryParams;
};

export const api = async (path: string, options?: ApiOptions) => {
  const { params, ...fetchOptions } = options ?? {};

  const query = params
    ? `?${new URLSearchParams(
        Object.entries(params)
          .filter(([, v]) => v !== undefined)
          .map(([k, v]) => [k, String(v)]),
      ).toString()}`
    : "";

  const res = await fetch(`${API_URL}${path}${query}`, {
    ...fetchOptions,
  });

  if (!res.ok) {
    console.error({ message: res.body });
    throw new Error("API Error");
  }

  return res.json();
};
