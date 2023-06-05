import { DocumentNode } from 'graphql'
import React from 'react'

interface Block {
  component: React.FunctionComponent
  query: DocumentNode
  extraQueries: [DocumentNode]
  componentName: string
  typename: string
}

const componentNameExtractor = (key: string): string => key.match(/^([^.]+)/)[0]

function requireAll(r) {
  return Object.fromEntries(
    r.keys().map((mpath, ...args) => {
      const result = r(mpath, ...args)
      const name = mpath
        // eslint-disable-next-line no-useless-escape
        .replace(/(?:^[.\/]*\/|\.[^.]+$)/g, '') // Trim
        .replace(/\//g, '_') // Relace '/'s by '_'s
      return [name, result]
    }),
  )
}

const components = requireAll(
  (require as any).context('components/blocks', true, /\.tsx?$/),
)
const blocks: {
  [componentName: string]: Block
} = {}
Object.keys(components).forEach((k) => {
  const b = components[k]
  const name = componentNameExtractor(k)

  const existingItem = blocks[name] || ({} as Block)
  if (b.typename) {
    // this is the react component
    existingItem.typename = b.typename
    existingItem.component = b.default
  } else if (k.includes('graphql')) {
    // check if fragment or additinal query
    if (k.includes('extraqueries')) {
      existingItem.extraQueries = b.default
    }
    // this is the graphql query
    existingItem.query = b.default
  }
  existingItem.componentName = name

  blocks[name] = existingItem
})

export default blocks

const getAvailableBlocks = (availableTypes?: string[]) => {
  if (availableTypes) {
    const availableBlocks: {
      [componentName: string]: Block
    } = {}

    Object.keys(blocks).forEach((blockKey) => {
      if (availableTypes.includes(blocks[blockKey].typename)) {
        availableBlocks[blockKey] = blocks[blockKey]
      }
    })
    return availableBlocks
  }
  return blocks
}

export const getFragments = (availableTypes?: string[]) =>
  Object.values(getAvailableBlocks(availableTypes))
    .map((i) => i.query)
    .join('')

export const getFragmentDestructor = (
  availableTypes?: string[],
  modulePrefix?: string,
) =>
  Object.values(getAvailableBlocks(availableTypes))
    .map((i) => `...${i.typename.replace(modulePrefix || 'Set_Modules_', '')}`)
    .join('\n')
