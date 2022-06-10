export default function GameLogic(producer, distributor, wholesaler, retailer, currentRound, startStock, startValue, raisedValue, roundOfRaise) {
    producer.stock += producer.next1Week
    producer.next1Week = producer.next2Week
    producer.next2Week = producer.order

    if(producer.stock >= distributor.order) {
        producer.stock -= distributor.order
        if(producer.delay > 0) {
            if(producer.delay > producer.stock) {
                producer.delay -= producer.stock
                distributor.order += producer.stock
                producer.stock = 0
            }
            else {
                producer.stock -= producer.delay
                distributor.order += producer.delay
                producer.delay = 0
            }
        }
        distributor.stock += distributor.next1Week
        distributor.next1Week = distributor.next2Week
        distributor.next2Week = distributor.order
    }
    else {
        let diff = distributor.order - producer.stock
        let oldStock = producer.stock
        producer.stock = 0
        producer.delay += diff
        distributor.stock += distributor.next1Week
        distributor.next1Week = distributor.next2Week
        distributor.next2Week = oldStock
    }

    if(distributor.stock >= wholesaler.order) {
        distributor.stock -= wholesaler.order
        if(distributor.delay > 0) {
            if(distributor.delay > distributor.stock) {
                distributor.delay -= distributor.stock
                wholesaler.order += distributor.stock
                distributor.stock = 0
            }
            else {
                distributor.stock -= distributor.delay
                wholesaler.order += distributor.delay
                distributor.delay = 0
            }
        }
        wholesaler.stock += wholesaler.next1Week
        wholesaler.next1Week = wholesaler.next2Week
        wholesaler.next2Week = wholesaler.order
    }
    else {
        let diff = wholesaler.order - distributor.stock
        let oldStock = distributor.stock
        distributor.stock = 0
        distributor.delay += diff
        wholesaler.stock += wholesaler.next1Week
        wholesaler.next1Week = wholesaler.next2Week
        wholesaler.next2Week = oldStock
    }

    if(wholesaler.stock >= retailer.order) {
        wholesaler.stock -= retailer.order
        if(wholesaler.delay > 0) {
            if(wholesaler.delay > wholesaler.stock) {
                wholesaler.delay -= wholesaler.stock
                retailer.order += wholesaler.stock
                wholesaler.stock = 0
            }
            else {
                wholesaler.stock -= wholesaler.delay
                retailer.order += wholesaler.delay
                wholesaler.delay = 0
            }
        }
        retailer.stock += retailer.next1Week
        retailer.next1Week = retailer.next2Week
        retailer.next2Week = retailer.order
    }
    else {
        let diff = retailer.order - wholesaler.stock
        let oldStock = wholesaler.stock
        wholesaler.stock = 0
        wholesaler.delay += diff
        retailer.stock += retailer.next1Week
        retailer.next1Week = retailer.next2Week
        retailer.next2Week = oldStock
    }

    if(roundOfRaise >= currentRound) {
        if(retailer.stock >= raisedValue) {
            retailer.stock -= raisedValue
            if(retailer.delay > 0) {
                if(retailer.delay > retailer.stock) {
                    retailer.delay -= retailer.stock
                    retailer.stock = 0
                }
                else {
                    retailer.stock -= retailer.delay
                    retailer.delay = 0
                }
            }
        }
        else {
            let diff = raisedValue - retailer.stock
            retailer.stock = 0
            retailer.delay += diff
        }
    }
    else {
        if(retailer.stock >= startValue) {
            retailer.stock -= startValue
            if(retailer.delay > 0) {
                if(retailer.delay > retailer.stock) {
                    retailer.delay -= retailer.stock
                    retailer.stock = 0
                }
                else {
                    retailer.stock -= retailer.delay
                    retailer.delay = 0
                }
            }
        }
        else {
            let diff = startValue - retailer.stock
            retailer.stock = 0
            retailer.delay += diff
        }
    }
    return [producer, distributor, wholesaler, retailer]
}