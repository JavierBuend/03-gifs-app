import { useState } from "react";
import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { mockGifs } from "./mock-data/gifs.mock";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";

export const GifsApp = () => {
  const [PreviousTerms, setPreviousTerms] = useState(["diseño"]);

  const handleTermClicked = (term: string) => {
    console.log({ term });
  };

  const handleSearch = (query: string) => {
    console.log({ query });
  };

  return (
    <>
      {/* Header */}
      <CustomHeader
        title="Buscador de gifs"
        description="Descubre y comparte el Gif perfecto"
      />
      <SearchBar placeholder="Buscar algo..." onQuery={handleSearch} />

      {/* Busquedas previas */}

      <PreviousSearches
        searches={PreviousTerms}
        onLabelClicked={handleTermClicked}
      />

      {/* GIFS */}

      <GifList gifs={mockGifs} />
    </>
  );
};
