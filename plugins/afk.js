let handler = async(m, { text }) => {
    let user = global.db.data.users[m.sender]
    user.afk = +new Date
    user.afkReason = text
    m.reply(`─「 *AFK MODE* 」─
    
Name : ${conn.getName(m.sender)} 
${text ? 'Alasan : ' + text : ''}`)
}
handler.help = false
handler.command = /^(afk)$/i

module.exports = handler