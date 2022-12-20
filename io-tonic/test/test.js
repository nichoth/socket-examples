// @ts-check
'use strict'

// import { dom } from '@socketsupply/test-dom'
import { test, GLOBAL_TEST_RUNNER } from 'tapzero'
import '@socketsupply/io/redirectOutput.js'
import sleep from './sleep.js'

const pollTimeout = setTimeout(function poll () {
  if (GLOBAL_TEST_RUNNER.completed) {
    clearTimeout(pollTimeout)
    // @ts-ignore
    window.__ipc.postMessage('ipc://exit?value=0')
  }

  setTimeout(poll, 500)
}, 500)

test('example', async t => {
    t.ok('example')

    // wait for rendering
    await sleep(1)

    const hello = document.getElementById('hello')

    // const hello = await dom.waitForText({
    //     element: document.body,
    //     regex: /hello, world/
    // })

    // t.ok(dom.isElementVisible(hello), 'should find the hello world text')

    t.equal(hello.textContent, 'hello, world', 'should have expected text')
})
