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