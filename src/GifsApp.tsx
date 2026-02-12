import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
// import { mockGifs } from "./mock-data/gifs.mock";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";

import { useGifs } from "./gifs/hooks/useGifs";

export const GifsApp = () => {
  const { handleSearch, PreviousTerms, handleTermClicked, gifs } = useGifs();

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

      <GifList gifs={gifs} />
    </>
  );
};
