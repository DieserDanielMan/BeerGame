export function calcPerfectOrderRate(perfectOrders, allOrders) {
    return perfectOrders / allOrders
}

export function calcStorageCostsWeekly(currentStorageCosts, backorderCosts) {
    return currentStorageCosts + backorderCosts
}

export function calcStorageCosts(previousWeekCosts, newStock){
    let stockCosts = 5;
    return previousWeekCosts + (newStock * stockCosts)
}

export function calcStorageCostsBackorder(previousWeekCosts, backorder){
    let backorderCosts = 10;
    return previousWeekCosts + (backorder * backorderCosts)
}

export function averageStock(sumStock, gameWeeks){
    return sumStock / (gameWeeks + 1)
}

export function backorderWeeksPct(weeksWithBackorders, gameWeeks){
    return weeksWithBackorders / gameWeeks
}


