import { giphyApi } from '../api/giphy.api';

import type { GiphyResponse } from '../interfaces/giphy.response';
import type { Gif } from '../interfaces/gif.interface';

// Función asíncrona que recibe un texto de búsqueda (query)
// y devuelve una promesa que resuelve en un arreglo de Gif
export const getGifsByQuery = async (query: string): Promise<Gif[]> => {

  // Realiza una petición GET al endpoint '/search'
  // Se tipa la respuesta como GiphyResponse para tener autocompletado y seguridad de tipos
  
  const response = await giphyApi<GiphyResponse>('/search', {
    params: {
      q: query,   // Texto que se enviará como término de búsqueda
      limit: 10,  // Limita la respuesta a 10 resultados
    },
  });

  // Transforma la respuesta original de la API
  // en un arreglo con la estructura definida por la interfaz Gif

  return response.data.data.map((gif) => ({
    id: gif.id,
    title: gif.title,
    url: gif.images.original.url, 
    width: Number(gif.images.original.width), 
    height: Number(gif.images.original.height),
  }));
};