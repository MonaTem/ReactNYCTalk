import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { configureStore, history } from './store/configureStore'
import Root from './containers/Root'
import response from './response'
import { normalize } from 'normalizr'
import * as Schema from './schema_backup'

const initialState = {
  entities: normalize(response, [Schema.post]).entities
}
const store = configureStore(initialState)

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const newConfigureStore = require('./store/configureStore')
    const newStore = newConfigureStore.configureStore()
    const newHistory = newConfigureStore.history
    const NewRoot = require('./containers/Root').default
    render(
      <AppContainer>
        <NewRoot store={newStore} history={newHistory} />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
