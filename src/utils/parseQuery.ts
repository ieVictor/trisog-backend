export function parseCountriesQuery(countries: unknown): Array<string> {
  if (Array.isArray(countries))
    return countries.flatMap((country) => {
      if (typeof country === 'string')
        return country.split(',').map((C) => C.trim());
      return [];
    });

  if (typeof countries === 'string' && countries.length > 0)
    return countries.split(',').map((C) => C.trim());

  return [];
}

export function parseCategoriesQuery(categories: unknown): Array<number> {
  if (typeof categories === 'string') {
    return categories
      .split(',')
      .map((id) => Number(id.trim()))
      .filter((id) => !isNaN(id));
  } else if (Array.isArray(categories)) {
    return categories.map((id) => Number(id)).filter((id) => !isNaN(id));
  }

  return []
}