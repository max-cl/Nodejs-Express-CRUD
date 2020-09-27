exports.Helper_1 = (todo) => {

    let data = todo.map(d => { 
        return { 
            id: d.id,
            title: d.title,
            done: d.done
        }; 
    });

    return data;
}