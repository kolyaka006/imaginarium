const logger = require('../lib/logger')

logger.info('Starting server...')
require('../../server/main').listen(process.env.PORT || 8000, () => {
  logger.success('Server is running at http://localhost:' + process.env.PORT)
})
