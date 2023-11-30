const reporter = process.env.CI ? {
  reporter: 'mocha-multi-reporters',
  reporterOptions: 'configFile=.mocha-multi-reporters.json',
} : {
  reporter: 'spec',
}

module.exports = {
  diff: true,
  extension: ['spec.ts'],
  package: './package.json',
  recursive: true,
  ...reporter,
  require: ['ts-node/register', 'source-map-support/register', "tsconfig-paths/register"],
  slow: 75,
  timeout: 5000,
  ui: 'bdd',
  watchFiles: ['src/**/*.ts', 'test/**/*.spec.ts'],
}
