interface PostType {
  title: string
  abbrlink: string
  date: string
  updated: string
  description: string
  cover?: string
}

declare module 'wordcount' {
  export default wordcount = (content: string) => number
}
