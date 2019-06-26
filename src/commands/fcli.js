module.exports = {
  name: 'fcli',
  run: async toolbox => {
    const { print } = toolbox

    print.info('Welcome to your CLI')
  }
}
