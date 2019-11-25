import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Header from './components/Header'
import Footer from './components/Footer'
import FilterNav from './components/FilterNav'
import Layout from './components/Layout'
import SocialEntries from './components/SocialEntries'

it('App renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('Header renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Header />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('Footer renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Footer />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('Filter Navigation renders without crashing', () => {
  const div = document.createElement('div')
  const pageInfo = { first: 5, offset: 0, query: 'All' }
  ReactDOM.render(<FilterNav pageInfo={pageInfo} />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('Layout renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Layout />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('Social Entries renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<SocialEntries />, div)
  ReactDOM.unmountComponentAtNode(div)
})
