export type SearchResultDTO = {
  slug: string;
  title: string;
  brandName: string;
  price: number;
  section: "bags" | "accessories";
  thumbSrc?: string;
  thumbHex: string;
};

export type SearchResponseDTO = {
  results: SearchResultDTO[];
};
