'use client'
import { store } from './Store'
import { Provider } from 'react-redux'

export function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>
}