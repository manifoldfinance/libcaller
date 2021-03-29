const RPC = require('rpc-stream')
const multiplex = require('multiplex')
const pump = require('pump')

module.exports = function (api) {
  let index = 2
  const irpc = RPC({ // internal rpc
    open: function (id, name, args) {
      if (typeof api[name] !== 'function') return
      args = [].splice.call(args)
      args.push((err, stream) => {
        if (err) {
          throw err
        }
        if (!stream || typeof stream.pipe !== 'function') return
        pump(
          stream,
          mx.createSharedStream(id),
          stream,
          (err) => {
            console.log(`multiplexRpc internal child "${id}" stream ended`, err.message)
          }
        )
      })
      api[name].apply(null, args)
    }
  })
  const iclient = irpc.wrap([ 'open' ])
  const prpc = RPC(api, {
    flattenError: (err) => {
      if (!(err instanceof Error)) return err
      console.error('sending error over rpc', err)
      return {
        message: err.message,
        stack: err.stack
      }
    }
  }) // public interface

  const mx = multiplex({ chunked: true })
  pump(
    irpc,
    mx.createSharedStream('0'),
    irpc,
    (err) => {
      console.log('multiplexRpc internal stream ended', err.message)
    }
  )
  pump(
    prpc,
    mx.createSharedStream('1'),
    prpc,
    (err) => {
      console.log('multiplexRpc public stream ended', err.message)
    }
  )

  mx.wrap = function (methods) {
    const m = typeof methods.map === 'undefined' ? Object.keys(methods) : methods
    const names = m.map(function (m) {
      return m.split(':')[0]
    })
    const wrapped = prpc.wrap(names)
    m.forEach(function (m) {
      const parts = m.split(':')
      const name = parts[0]
      if (parts[1] === 's') {
        wrapped[name] = wrapStream(name)
      }
    })
    return wrapped
  }
  return mx

  function wrapStream (name) {
    return function () {
      const args = [].slice.call(arguments)
      const id = String(index++)
      iclient.open(id, name, args)
      return mx.createSharedStream(id)
    }
  }
}
