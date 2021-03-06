// AQUI DEVE SER PRÉ-CONFIGURADO TODOS OS TIPOS DE REQUISIÇÕES QUE A API TRABALHA 
//export const API_URL = 'https://api.tmenu.com.br/v1/';
export const API_URL = 'http://localhost:3333/v1/';
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

export function GET_VALIDATE_TOKEN(token){
return{
  url:`${API_URL}auth/validate/manager`,
  options:{
    method:'GET',
    headers:{
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
     }
  }
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
export function POST_PRINTER(token, body){
  return{
    url: API_URL+'manager/printer',
    options:{
      method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(body)
    }
  }
}

//PRODUCTS
export function GET_PRODUCTS(token, paginate, search=null){
  const namex = /[a-zA-z]+/g
  const categoryx = /\d+/g
  const statusx = /&status/g
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

export function POST_PRODUCT(token, body){
  return{
    url:API_URL+'manager/product',
    options:{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body:JSON.stringify(body)
    }
  }
}

export function PUT_PRODUCT_ATTRIBUTE(token, product_id, attribute_id){
  return{
    url:`${API_URL}manager/product/${product_id}/attribute/${attribute_id}`,
    options:{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  }
}

export function GET_PRODUCT(token, id){
  return{
    url:`${API_URL}manager/product/${id}`,
    options:{
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  }
}
//ATTRIBUTES

export function GET_ATTRIBUTES(token){
  return{
    url:`${API_URL}manager/attribute`,
    options:{
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }  
  }
}

export function POST_ATTRIBUTE(token, body){
  return{
    url:`${API_URL}manager/attribute`,
    options:{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }, 
      body:JSON.stringify(body)
    }  
  }
}

export function POST_ATTRIBUTE_VALUE(token, body){
  return{
    url:`${API_URL}manager/value-attribute`,
    options:{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }, 
      body:JSON.stringify(body)
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


//TABLES
export function GET_TABLES(token, paginate){
  let url = `${API_URL}manager/table?page=${paginate.page}&limit=${paginate.perPage}`
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

export function PUT_ADD_WAITER_TO_TABLE(token, table_id, user_id){
  return{
    url:`${API_URL}manager/table/${table_id}/user/${user_id}`,
    options:{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  }
}

export function PUT_UPDATE_TABLE(token, body, id){
  const url = `${API_URL}manager/table/${id}`
  return{
    url:url,
    options:{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    }
  }
}

export function PUT_CLOSE_TABLE(token, id, body){
  return{
    url:`${API_URL}manager/close-table/${id}`,
    options:{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`  
      },
      body:JSON.stringify(body)
    }
  }
}

//COMPANIES
export function GET_COMPANY(token){
  return{
    url:API_URL+'manager/company',
    options:{
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`  
      }
    }
  }
}

//ORDERS

export function GET_LAST_ORDERS(token, id){
  return{
    url:`${API_URL}manager/order-card/${id}`,
    options:{
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`  
      }
    }
  }
}



//CARDS

export function PUT_CLOSE_ORDER(token, id){
  return{
    url:`${API_URL}manager/card/${id}`,
    options:{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`  
      }
    }
  }
}


//IMAGES

export function POST_ADD_IMAGE_PRODUCT(token,formData){
  return{
    url:`${API_URL}manager/image-product`,
    options:{
      method:'POST',
      headers:{
        //'Content-Type': ' multipart/form-data',
        //'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`  
      },
      body:formData
    }
  }
}


//ORDERS
export function GET_ORDERS(token, paginate,search=null){
  let url = `${API_URL}manager/order?page=${paginate.page}&limit=${paginate.perPage}`
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


//CLIENTES

export function GET_CLIENTS(token, paginate, search=null){
  let url = `${API_URL}manager/client?page=${paginate.page}&limit=${paginate.perPage}`
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