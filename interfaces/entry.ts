import Asset from './asset'

export default interface Entry {
  id: string
  __typename: string
  modules: any[]
  title: string
  date: string
}

export interface ProjectEntry extends Entry {}
