export function checkIfPlayerIsInAnyRoom(io, playerSocketId) {
  let returnValue = false
  io.sockets.adapter.rooms.forEach((value, key) => {
    console.log(key + "-------------------")
    io.sockets.adapter.rooms.get(key).forEach((valueInner) => {
      console.log(valueInner + " | Sock: " + playerSocketId)
      if (valueInner === playerSocketId && key !== playerSocketId) returnValue = true
    })
  })
  return returnValue
}

const stockCosts = 5
const backorderCosts = 10

//Berechnung der Wochen ohne Störungen (Perfekte Auftragsrate)
export function calcPerfectOrderRatePct(perfectOrders, allOrders) {
    return ((perfectOrders / allOrders)*100).toFixed(3)
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
export function calcAverageStock(sumStock, gameWeeks){
    return (sumStock / (gameWeeks + 1)).toFixed(3)
}

//Berechnung der Wochen mit Lieferrückstand in Prozent
export function calcBackorderWeeksPct(weeksWithBackorders, gameWeeks){
    return ((weeksWithBackorders / gameWeeks)*100).toFixed(3)
}