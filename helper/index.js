exports.Helper_1 = (products) => {

    let data = products.map(d => { 
        return { 
            id_product: d.id_product,
            name_product: d.name_product
        }; 
    });

    return data;
}