// AQUI DEVE SER PRÉ-CONFIGURADO TODOS OS TIPOS DE REQUISIÇÕES QUE A API TRABALHA 
export const API_URL = 'https://api.tmenu.com.br/v1/';

export function LOGIN(body) {
    return {
      url: API_URL + 'auth/login',
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    };
  }

  