const { nanoid } = require('nanoid')

const getId = () => nanoid().slice(0, 5)

module.exports = {
  getId,
}
