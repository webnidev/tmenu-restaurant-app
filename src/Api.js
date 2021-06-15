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
export function GET_USER(token, body){
  return{

  }
}

export function GET_PRODUCTS(token, paginate, search=null){
  const namex = /[a-zA-z]+/g
  let url = `${API_URL}manager/product?page=${paginate.page}&limit=${paginate.perPage}`
  if(search){
    if(search.match(namex)){
      url+=`&name=${search}`
    }else{
      url+=`&code=${search}`
    }
  }
  return{
    url: url,
   options:{
    method:'GET',
    headers:{
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
    },
    body:''
  }
}
  