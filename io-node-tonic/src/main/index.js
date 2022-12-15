// @ts-check
'use strict'

import system from '@socketsupply/ssc-node'

async function main () {
    //
    // implement a function `system.receive` to expose node APIs to the
    // "front-end" app
    //
    // @ts-ignore
    system.receive = async (command, value) => {
        // command = 'send'
        // value is passed by caller
        if (command !== 'send') {
            return console.log('unexpected command', command)
        }

        if (value && value.restart) {
          await system.restart()
        }

        // what to do as an example node function?

        if (value.method && value.method === 'test') {
            // const last = await fns.getLastState()
            // return { mode: last }
            console.log('testing')
        }
    }
}

main().then(null, err => {
    process.nextTick(() => { throw err })
})
