export { copyObj };

function copyObj(obj){

    const result = Array.isArray(obj)? [] : {};

    for(let key in obj){
        if(typeof obj[key] === 'object') result[key] = copyObj(obj[key]);

        else if(Array.isArray(obj[key])){
            result[key] = obj[key].slice().map((v) => {
                return copyObj(v);
            });
        }
        
        else result[key] = obj[key];
    }

    return result;
}
