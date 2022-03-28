const { servers, ytv } = require('../lib/y2mate')
let handler = async (m, { conn, args, isOwner }) => {
  if (!args || !args[0]) throw 'Uhm... donde esta la url?'
  let server = (args[1] || servers[0]).toLowerCase()
  let { dl_link, thumb, title, filesize, filesizeF} = await ytv(args[0], servers.includes(server) ? server : servers[0])
  let isLimit = (isOwner ? 99 : 30) * 1024 < filesize
  if (isLimit) return m.reply(`*Rechazado, el archivo es demasiado grande!!*\n*Descárgalo tú mismo usando el enlace :* ${await shortlink(dl_link)}`)
let _thumb = {}
try { _thumb = { thumbnail: await (await fetch(thumb)).buffer() } } 
catch (e) { }
conn.sendFile(m.chat, dl_link, title + '.mp4', `
*Titulo:* ${title}
*Tamaño:* ${filesizeF}
`.trim(), m, false, {
..._thumb,
asDocument: false
})
}
handler.help = ['mp4','v'].map(v => 'yt' + v + ` ${inUrl} ${inOption(`server: ${servers.join(', ')}`)}`)
handler.tags = ['downloader']
handler.command = /^yt(v|mp4)$/i

handler.fail = null

module.exports = handler

async function shortlink(url) {
isurl = /https?:\/\//.test(url)
return isurl ? (await require('axios').get('https://tinyurl.com/api-create.php?url='+encodeURIComponent(url))).data : ''
}

