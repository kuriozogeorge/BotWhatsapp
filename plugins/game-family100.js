let fetch = require('node-fetch')
async function handler(m) {
    this.game = this.game ? this.game : {}
    let id = 'family100_' + m.chat
    if (id in this.game) {
        this.reply(m.chat, 'Todavía hay cuestionarios sin responder en este chat.', this.game[id].msg)
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/family100.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `
*Pregunta:* ${json.soal}

Hay *${json.jawaban.length}* respuesta${json.jawaban.find(v => v.includes(' ')) ? `
(algunas respuestas tienen espacios )
`: ''}`.trim()
    this.game[id] = {
        id,
        msg: await this.reply(m.chat, caption, m),
        ...json,
        terjawab: Array.from(json.jawaban, () => false)
    }
}
handler.help = ['family100']
handler.tags = ['game']
handler.command = /^(family100)$/i

module.exports = handler