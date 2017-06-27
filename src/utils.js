const bcrypt = require('bcryptjs')

const hash = pass => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(pass, 10, (err, hash) => {
      if (err) return reject(err)
      return resolve(hash)
    })
  })
}

module.exports = {
  hash,
  compare: bcrypt.compare
}
