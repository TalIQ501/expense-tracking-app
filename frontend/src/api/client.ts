const API_URL = import.meta.env.VITE_API_URL;

export const api = async <T>(path: string, options?: RequestInit) => {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
  });

  if (!res.ok) {
    console.error({ message: res.body });
    throw new Error("API Error");
  }

  return res.json();
};
