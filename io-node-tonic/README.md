# io, node example
An example of an app that uses the node.js API via `ssc-node`.

We build two files -- `src/index.js` and `src/main/index.js`. The first is our 'client-side' JS. This runs in an environment that has browser APIs available. `src/main/index.js` runs in a node-like environment. All node APIs are available to `import`.

These are exposed to the frontend via IPC calls, `system.receive`:
```js
system.receive = async (command, value) => {
```
