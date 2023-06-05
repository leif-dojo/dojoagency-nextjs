interface NavTree {
  page: {
    id: string
    url: string
    title: string
    uri: string
    children?: {
      page: {
        id: string
        url: string
        title: string
        uri: string
      }
    }[]
  }
  children: NavTree
}

export default interface NavInterface {
  tree: NavTree[]
}
