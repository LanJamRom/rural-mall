import utils, { importAll } from '@/src/basic/utils'
import merge from 'lodash/merge'

const baseUtils = importAll(require.context('./utils', true, /\.js$/))

export default merge(utils, baseUtils)
