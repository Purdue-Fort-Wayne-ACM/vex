import type { MDXComponents } from 'mdx/types'
 
// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 className="text-5xl font-bold">{children}</h1>
    ),
    h2: ({ children }) => (
      <h1 className="text-4xl mt-4 font-bold">{children}</h1>
    ),
    h3: ({ children }) => (
      <h1 className="text-2xl mt-2 font-bold">{children}</h1>
    ),
    h4: ({ children }) => (
      <h1 className="text-l mt-1.5 font-bold">{children}</h1>
    ),
    hr: ({children}) =>(
        <hr className="m-1.5">{children}</hr>
    ),
    p: ({children}) =>(
        <p className="mb-3">{children}</p>
    ),
    ul: ({children}) =>(
        <ul className="list-disc">{children}</ul>
    ),
    table : ({children}) => (
      <table className="table-auto border-collapse border border-gray-300 w-full text-left"></table>
    ),
    th : ({children}) => (
      <th className="border border-gray-300 px-4 py-2"></th>
    ),
    tr : ({children}) => (
      <tr className="hover:bg-gray-50"></tr>
    ),
    td : ({children}) => (
      <td className="border border-gray-300 px-4 py-2"></td>
    ),
    ...components,
  }
}