type accentOptionType = {
  value: string;
  label: string;
};

const accents: string[] = ['coral', 'darkorange', 'gold', 'lightpink', 'royalblue', 'teal'];

export const accentOptions: accentOptionType[] = accents.map((accent) => ({ value: accent, label: accent }));
