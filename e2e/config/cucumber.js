module.exports = {
  default: {
    paths: ['tests/features/**/*.feature'],
    dryRun: false,
    format: [
      '@cucumber/pretty-formatter',
      'progress-bar',
      'summary',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json',
    ],
    formatOptions: {
      colorsEnabled: true,
      snippetInterface: 'async-await',
    },
    require: ['tests/step-definitions/**/*.ts', 'setup/**/*.ts'],
    requireModule: ['ts-node/register'],
    parallel: 0,
  },
};