const stockCosts = 5
const backorderCosts = 10

//Berechnung der Wochen ohne Störungen (Perfekte Auftragsrate)
export function calcPerfectOrderRatePct(perfectOrders, allOrders) {
    return perfectOrders / allOrders
}

//Berechnung der Lagerkosten für die einzelne Woche (kumulierte Kosten pro Woche)
export function calcStorageCostsWeekly(currentStorageCosts, backorderCosts) {
    return currentStorageCosts + backorderCosts
}

//Berechnung der Lagergesamtkosten mit Lagerbestandsmenge
export function calcStorageCosts(previousWeekCosts, newStock){
    return previousWeekCosts + (newStock * stockCosts)
}

//Berechnung der Lagergesamtkosten mit Backorderanzahl
export function calcStorageCostsBackorder(previousWeekCosts, backorder){
    return previousWeekCosts + (backorder * backorderCosts)
}

//Berechnung des durchschnittlichen Lagerbestand
export function averageStock(sumStock, gameWeeks){
    return sumStock / (gameWeeks + 1)
}

//Berechnung der Wochen mit Lieferrückstand in Prozent
export function backorderWeeksPct(weeksWithBackorders, gameWeeks){
    return weeksWithBackorders / gameWeeks
}


