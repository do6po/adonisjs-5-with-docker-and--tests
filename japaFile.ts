import 'reflect-metadata'
import {join, isAbsolute, sep} from 'path'
import getPort from 'get-port'
import {configure} from 'japa'
import sourceMapSupport from 'source-map-support'
import dotenv from 'dotenv'

dotenv.config({path: '.env.testing'})

process.env.ADONIS_ACE_CWD = join(__dirname, '..')
sourceMapSupport.install({handleUncaughtExceptions: false})

// Add this method to the file
function getTestFiles () {
  let userDefined = process.argv.slice(2)[0]
  if (!userDefined) {
    return 'build/test/**/*.spec.js'
  }

  if (isAbsolute(userDefined)) {
    userDefined = userDefined.endsWith('.ts')
      ? userDefined.replace(`${join(__dirname, '..')}${sep}`, '')
      : userDefined.replace(`${join(__dirname)}${sep}`, '')
  }

  return `build/${userDefined.replace(/\.ts$|\.js$/, '')}.js`
}

async function startHttpServer() {
  const {Ignitor} = await import('@adonisjs/core/build/src/Ignitor')
  process.env.PORT = String(await getPort())
  await new Ignitor(__dirname).httpServer().start()
}

/**
 * Configure test runner
 */
configure({
  files: getTestFiles(),
  before: [
    startHttpServer,
  ],
  after: []
})
