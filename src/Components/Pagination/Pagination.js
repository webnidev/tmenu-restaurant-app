import React from 'react'

const Pagination =({paginate, paginateUpdate})=>{
    const pagination = []
    for(let page = 1; page <= paginate.lastpage; page++){
        pagination.push(page)
    }
    return (
        <div className="center">
        <div className="pagination">
            { paginate.page > 1 && <p onClick={paginateUpdate} id={parseInt(paginate.page)-1}>&laquo;</p>}
           {pagination.map(page=>{         
                return(
                    <>
                    <span key={page}></span>
                    {
                        page == paginate.page?<p className="active" onClick={paginateUpdate}  id={page}>{page}</p>:
                        <p  onClick={paginateUpdate} id={page}>{page}</p>
                        
                    }
                    
                    </>
                )
           })
           }
           { paginate.page != paginate.lastpage && <p onClick={paginateUpdate} id={parseInt(paginate.page)+1}>&raquo;</p> }
        </div>
        </div>
    )
}

export default Pagination