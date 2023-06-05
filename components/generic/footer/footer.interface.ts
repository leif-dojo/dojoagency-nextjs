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
  depth: any
  children: {
    page: {
      id: string
      url: string
      title: string
      uri: string
    }
  }[]
}

export default interface FooterInterface {
  tree: NavTree[]
}
