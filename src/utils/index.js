

export const cleanObject = (obj) => {
    const res = {...obj};

    Object.keys(res).forEach(key => {
        const value = res[key];
        console.log(key, value, isFalsy(value))
        if(isFalsy(value)) {
            delete res[key];
        }
        console.log(res)
    })

    return res
}

export const isFalsy = (value) => value === 0 ? false : !value;
