import test from 'japa'
import Database from '@ioc:Adonis/Lucid/Database'

test.group('Example', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('assert sum', (assert) => {
    assert.equal(2 + 2, 4)
  })
})
