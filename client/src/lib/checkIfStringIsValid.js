export default function checkIfStringIsValid(userInput, mode = "default") {
    let validChars = []
    if(mode === "default") {
        validChars = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
            "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
            "0","1","2","3","4","5","6","7","8","9"]
    }
    else if(mode === "numeric") {
        validChars = ["0","1","2","3","4","5","6","7","8","9"]
    }
    let stringIsValid = true
    if(userInput.length === 0) {
        return stringIsValid = false
    }
    for(let i=0; i<userInput.length; i++) {
        console.log(userInput[i])
        console.log(validChars.indexOf(userInput[i]))
        if(validChars.indexOf(userInput[i]) === -1)
            stringIsValid = false
    }
    return stringIsValid
}