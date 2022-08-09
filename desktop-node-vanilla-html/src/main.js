

const path = require('path')
const assert = require('assert')
const { system } = require('@socketsupply/ssc-node')
//console.log('process.argv', process.argv)
//console.log('open:', path.resolve(process.argv[2]))
async function main () {
  await system.show({ window: 0 })
  
  system.receive = async (command, value) => {
    console.log("system receive???", command, value)
    if (value && value.restart) {
      await system.restart()
    }

    return {
      received: value,
      command,
      counter: counter++
    }
  }
  

  const resourcesDirectory = path.dirname(process.argv[1])
  const file = path.join(resourcesDirectory, 'index.html')
  await system.navigate({ window: 0, value: `file://${file}` })

//  await system.navigate({ window: 0, value: `file:///home/dominic/c/socket-sdk-examples/desktop-node-vanilla-html/src/index.html` })

  const size = await system.getScreenSize()

  assert(size.width, 'screen has width')
  assert(size.height, 'screen has width')

  await system.setTitle({ window: 0, value: "hello world?" })
  /*
  system.send({
    window: 0,
    event: 'data',
    value: {
      sending: data.join(''),
      counter,
      size
    }
  })
  */
}

main()
