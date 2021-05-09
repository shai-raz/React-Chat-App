export class Msg {
    constructor(content, from, to, date) {
        this.from = from
        this.to = to
        this.content = content
        this.date = date
    }
}