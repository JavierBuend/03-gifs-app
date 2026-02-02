import { useState } from "react";
import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { mockGifs } from "./mock-data/gifs.mock";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.actions";
import type { Gif } from "./gifs/interfaces/gif.interface";

export const GifsApp = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);

  const [PreviousTerms, setPreviousTerms] = useState<string[]>([]);

  const handleTermClicked = (term: string) => {
    console.log({ term });
  };

  const handleSearch = async (query: string = "") => {
    //Validar que el query no esté vacío
    query = query.trim().toLowerCase(); //Convertir el query a minúsculas y eliminar espacios en blanco

    if (query.length === 0) return;
    if (PreviousTerms.includes(query)) return; //Evitar búsquedas duplicadas verificando si el término ya existe en previousTerms ( si existe, no hacer nada )

    setPreviousTerms([query, ...PreviousTerms].splice(0, 8)); //Actualizar previousTerms agregando el nuevo término al inicio y limitando a 8 elementos máximo, es decir no puede ser un arreglo de más de 8.

    const gifs = await getGifsByQuery(query);
    console.log({ gifs });

    setGifs(gifs);
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

      <GifList gifs={gifs} />
    </>
  );
};
