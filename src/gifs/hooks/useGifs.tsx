import { useState } from "react";
import { getGifsByQuery } from "../actions/get-gifs-by-query.actions";
import type { Gif } from "../interfaces/gif.interface";
const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [PreviousTerms, setPreviousTerms] = useState<string[]>([]);

  const handleTermClicked = async (term: string) => {
    if (!gifsCache[term]) {
      return;
    }
    const gifs = await getGifsByQuery(term);
    setGifs(gifs);
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

    gifsCache[query] = gifs;
  };
  return {
    //properties
    gifs,

    //methods
    handleSearch,
    PreviousTerms,
    handleTermClicked,
  };
};
