import path from 'path'
import fs from 'fs/promises'
import { spawn } from 'child_process'
import esbuild from 'esbuild'
import { createServer, request } from 'http'

const target = 'dist/mac/TestExample-dev.app/Contents/Resources';

const cp = async (a, b) => fs.copyFile(
  path.resolve(a),
  path.join(b, path.basename(a))
)

async function watchBackend () {
  const watcher = fs.watch(path.resolve('src/main'), { recursive: true })
  for await (const { filename } of watcher) {
    cp(`src/main/${filename}`, path.resolve(target))
  }
  // spawn('node', ['--watch', path.resolve(`${target}/main.js`)])
}

const clients = []

esbuild
  .build({
    entryPoints: ['./src/render/index.jsx'],
    bundle: true,
    outdir: target,
    banner: { js: ' (() => new EventSource("/esbuild").onmessage = () => location.reload())();' },
    format: 'esm',
    watch: {
      onRebuild(error, result) {
        clients.forEach((res) => res.write('data: update\n\n'))
        clients.length = 0
        console.log(error ? error : '...')
      },
    },
  })
  .catch(() => process.exit(1))

esbuild.serve({ servedir: target }, {}).then(() => {
  createServer((req, res) => {
    const { url, method, headers } = req
    if (req.url === '/esbuild') {
      return clients.push(
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*',
          Connection: 'keep-alive',
        })
      )
    }
    const path = ~url.split('/').pop().indexOf('.') ? url : `/index.html` //for PWA with router
    req.pipe(
      request({ hostname: '0.0.0.0', port: 8000, path, method, headers }, (prxRes) => {
        res.writeHead(prxRes.statusCode, prxRes.headers)
        prxRes.pipe(res, { end: true })
      }),
      { end: true }
    )
  }).listen(3000)
})

watchBackend()

// esbuild.build(
//   {
//     entryPoints: ['src/render/index.jsx'],
//     bundle: true,
//     keepNames: true,
//     watch: true,
//     // minify: true,
//     outfile: path.join(target, 'render.js'),
//     platform: 'browser'
//   }
// )
