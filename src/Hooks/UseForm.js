import React from 'react'

const useForm = (start='') => {
    const [value, setValue] = React.useState(start)

    function onChange({target}){
        setValue(target.value)
    }

    return{
        value,
        setValue,
        onChange
    }
}


export default useForm