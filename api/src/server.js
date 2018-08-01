const express = require('express')
const fs = require('fs')
const Mode = require('stat-mode')
const { join } = require('path')

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.get('/:path', (req, res) => {
  try {
    const isRecursive = typeof req.query['recursive'] !== 'undefined'
    const path = req.params['path']

    const files = flatten(dirList(isRecursive, path))
    const size = files.reduce((acc, file) => acc + file.size, 0)

    res.json({
      files,
      path,
      size,
    })
  }
  catch (err) {
    res.sendStatus(400)
  }
})

app.listen(3000, () => {
  console.log('Server up and running on port 3000')
})


// Let's dump it all in here :P

/**
 * Produces a directory listing (array of files) from the given root path
 */
function dirList(isRecursive, path = '.') {
  const files = fs.readdirSync(path)

  return flatten(
    files.map(file => {
      const currentFile = join(path, file)
      const stats = fs.statSync(currentFile)

      return (stats.isDirectory() && isRecursive)
        ? dirList(isRecursive, currentFile)
        : {
          attr: new Mode(stats).toString(),
          path: currentFile,
          size: stats.size,
        }
    })
  )
}

/**
 * Flattens a nested array into a single dimension
 */
function flatten(arr) {
  return arr.reduce((flat, toFlatten) => {
    return flat.concat(
      Array.isArray(toFlatten)
        ? flatten(toFlatten)
        : toFlatten
    )
  }, [])
}

