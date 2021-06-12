import React from 'react'
import { Provider } from 'react-redux'

import store from './store'
import UseFetch, { useFetch } from './helpers/useFetch'

UseFetch.configure(config => {
  config.baseUrl = 'https://jsonplaceholder.typicode.com'
  config.authentificationHeader = () => {
    return {
      Authorization: localStorage.getItem('id_token'),
    }
  }
  config.compressionTimeoutDelay = 200
  config.maximumSize = 2 * 1024 * 1024 // 2Mb.
  config.protectedFromCleaning = ['profile', /^patients\/importants/]
})

function App() {
  const [{ users, posts }, isLoading] = useFetch((fetch: Function) => ({
    users: fetch('/users'),
    posts: fetch('/posts', { queryParams: { order: 'label ASC' } }),
  }))

  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <p>Loading {`${isLoading}`}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </Provider>
  )
}

export default App
