// AQUI DEVE SER PRÉ-CONFIGURADO TODOS OS TIPOS DE REQUISIÇÕES QUE A API TRABALHA 
export const API_URL = 'https://api.tmenu.com.br/v1/';
//USERS
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
//PRINTERS
export function GET_PRINTERS(token){
 let url = `${API_URL}manager/printer`
 return{
   url:url,
   options:{
     method:'GET',
     headers:{
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
     }
   }
 }
}

//PRODUCTS
export function GET_PRODUCTS(token, paginate, search=null){
  const namex = /[a-zA-z]+/g
  const categoryx = /\d+/g
  const statusx = /\&status/g
  let url = `${API_URL}manager/product?page=${paginate.page}&limit=${paginate.perPage}`
  if(search){
    if(search.match(statusx)){
      url+=search
    }else if(search.match(namex)){
      url+=`&name=${search}`
      console.log('Aqui é nome')
    }
    else if(search.match(categoryx)){
      console.log(search)
      url+=`&category_id=${search}`
    }else{
      console.log('Aqui é code')
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
    }
  }
}

//CATEGORIES
export function GET_CATEGORIES(token, paginate, search=null){
  const namex = /[a-zA-z]+/g
  let url = `${API_URL}manager/category?page=${paginate.page}&limit=${paginate.perPage}`
  if(search){
    if(search.match(namex)){
      url+=`&name=${search}`
    }
  }
  return{
    url:url,
    options:{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  }
}