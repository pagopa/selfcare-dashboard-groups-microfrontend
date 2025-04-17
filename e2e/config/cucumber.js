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

// module.exports = {
//   default: {
//        // tags: process.env.npm_config_TAGS || "",
//       formatOptions: {
//           snippetInterface: "async-await"
//       },

//       paths: [
//           "features/**/*.feature"
//       ],

//       publishQuiet: true,
//       dryRun: false,
//       require: [
//           "src/test/steps/*.ts",
//           "src/hooks/hooks.ts"
//       ],
//       requireModule: [
//           "ts-node/register"
//       ],
//       format: [
//           "progress-bar",
//           "html:test-results/cucumber-report.html",
//           "json:test-results/cucumber-report.json",
//           "rerun:@rerun.txt"
//       ],
//       parallel: 1
//   },
//   rerun: {
//       formatOptions: {
//           snippetInterface: "async-await"
//       },
//       publishQuiet: true,
//       dryRun: false,
//       require: [
//           "src/test/steps/*.ts",
//           "src/hooks/hooks.ts"
//       ],
//       requireModule: [
//           "ts-node/register"
//       ],
//       format: [
//           "progress-bar",
//           "html:test-results/cucumber-report.html",
//           "json:test-results/cucumber-report.json",
//           "rerun:@rerun.txt"
//       ],
//       parallel: 2
//   }
// }
