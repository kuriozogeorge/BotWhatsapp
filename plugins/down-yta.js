const { servers, yta } = require('../lib/y2mate')
let handler = async (m, { conn, args, isOwner }) => {
  if (!args || !args[0]) throw 'Uhm... donde esta la url?'
  let server = (args[1] || servers[0]).toLowerCase()
  let { dl_link, thumb, title, filesize, filesizeF} = await yta(args[0], servers.includes(server) ? server : servers[0])
  let isLimit = (isOwner ? 99 : 40) * 1024 < filesize
  conn.sendFile(m.chat, thumb, 'thumbnail.jpg', `
*Titulo :* ${title}
*Tamaño :* ${filesizeF}
${isLimit ? '\n*El archivo es demasiado grande !!*\n*Descárgalo tú mismo usando  ': '*'}Link :* ${await shortlink(dl_link)}
`.trim(), m)
  if (!isLimit) conn.sendFile(m.chat, dl_link, title + '.mp3', `
*Titulo:* ${title}
*Tamaño:* ${filesizeF}
`.trim(), m, null, { asDocument: true })
}
handler.help = ['mp3','a'].map(v => 'yt' + v + ` ${inUrl} ${inOption(`server: ${servers.join(', ')}`)}`)
handler.tags = ['downloader']
handler.command = /^yt(a|mp3)$/i

handler.fail = null

module.exports = handler

async function shortlink(url) {
isurl = /https?:\/\//.test(url)
return isurl ? (await require('axios').get('https://tinyurl.com/api-create.php?url='+encodeURIComponent(url))).data : ''
}