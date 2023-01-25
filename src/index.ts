import md5 from 'blueimp-md5'
import { lstatSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import wordcount from 'wordcount'

const Config = {
  Post: {
    path: './posts/',
    output: './api/posts.json'
  },
  Announcement: {
    url: './hints/AnnouncementInfo.md',
    output: './api/announcement.json'
  },
  Notice: {
    url: './hints/Notice.md',
    output: './api/notice.json'
  }
}

// 获取文件夹下的所有 MD 文件相对路径
const getDirAllMarkDownPath = (dir: string): string[] => {
  const filenames = readdirSync(dir)
  return filenames
    .reduce((pre, cur) => {
      const path = join(dir, cur)
      lstatSync(path).isDirectory() ? pre.push(...getDirAllMarkDownPath(path)) : pre.push(path)
      return pre
    }, [] as string[])
    .filter(v => v.endsWith('.md'))
}

// 获取 MD 信息
const reg = /(^-{3,}\s+)(?<info>.*?)\1(?<content>.*)/ms
const getPostInfo = (path: string): PostType => {
  const match = readFileSync(path, 'utf-8').match(reg)
  const { info, content } = match?.groups as { info: string; content: string }
  const infoStr = `{${info.replace(/(\w+):\s*(.*)(\r\n|\n)/gm, '"$1": "$2",\r\n').slice(0, -3)}}`
  return Object.assign(JSON.parse(infoStr), { wordcount: wordcount(content) })
}

const main = () => {
  // 保存文章信息
  const postInfo = JSON.stringify(
    getDirAllMarkDownPath(Config.Post.path)
      .map(path => Object.assign(getPostInfo(path), { url: path }))
      .sort((a, b) => Date.parse(b.updated) - Date.parse(a.updated))
  )
  writeFileSync(Config.Post.output, postInfo, { encoding: 'utf-8' })
  // 侧边公告信息 & 全局公告信息
  type itemType = typeof Config['Announcement']
  ;([Config.Announcement, Config.Notice] as itemType[]).forEach(item => {
    const content = readFileSync(item.url, 'utf-8')
    const Info = JSON.stringify({
      url: item.url,
      md5: md5(content)
    })
    writeFileSync(item.output, Info, { encoding: 'utf-8' })
  })
}
main()
