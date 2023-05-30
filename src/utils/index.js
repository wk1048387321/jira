

export const cleanObject = (obj) => {
    const res = {...obj};

    Object.keys(res).forEach(key => {
        const value = res[key];

        if(isFalsy(value)) {
            delete res[key];
        }
    })

    return res
}

export const isFalsy = (value) => value === 0 ? false : !value;
