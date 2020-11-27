module.exports = (ordering)=>{
    const sign = ordering ? ordering[0] === "-" ? "DESC" : "ASC" : null;
    const orderingQuery = sign ? sign === "DESC" ? ordering.slice(1) : (ordering[0] === "+" || ordering[0] === " ") ? ordering.slice(1) : ordering : null;
    const order = ordering ? [
        [orderingQuery,sign]
    ] : null;

    return order;
}