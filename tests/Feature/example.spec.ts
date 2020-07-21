import testCase from "../FeatureCase"

testCase.test.group('Site home', () => {
  testCase.test('ensure home page works', async (assert) => {

    const { text } = await testCase.request()
      .get('/')
      .expect(200)

    const { document } = new testCase.JSDOM(text).window

    const title = document.querySelector('.title')
    assert.exists(title)
    assert.equal(title!.textContent!.trim(), 'My title')
  })
})
