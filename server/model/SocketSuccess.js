export default class SocketSuccess {
    constructor(status, message, body) {
        this.head = {
            status: status,
            message: message
        }
        this.body = body
    }

}