export default class SocketError {
    constructor(message) {
        this.head = {
            err: true,
            errMsg: message
        }
    }
}