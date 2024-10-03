interface QueryData {
    [key: string]: any;
  }
  
export const jsonToQueryString = (json: QueryData): string => {
  const searchParams = new URLSearchParams();
  Object.keys(json).forEach((key) => {
    const value = json[key as keyof QueryData];
    if (typeof value === "object" && value !== null) {
      const nestedKeys = Object.keys(value);
      const nestedValues = nestedKeys.map((nestedKey) => value[nestedKey]).join("+");
      searchParams.append(key, nestedValues);
    } else {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
};