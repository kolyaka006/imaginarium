import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'game/:id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Game = require('../Game/containers/GameContainer').default
      const reducer = require('../Game/modules/game').default
      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'game', reducer })

      /*  Return getComponent   */
      cb(null, Game)

      /* Webpack named bundle   */
    }, 'game')
  }
})
