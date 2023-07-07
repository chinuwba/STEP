const { defineConfig } = require("cypress");
const webpack = require("@cypress/webpack-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");

async function setupNodeEvents(on, config) {
  //This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    webpack({
      webpackOptions: {
        resolve: {
          extensions: [".ts", ".js"],
        },
        module: {
          rules: [
            {
              test: /\.feature$/,
              use: [
                {
                  loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                  options: config,
                },
              ],
            },
          ],
        },
      },
    })
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;  
}

module.exports = defineConfig({
  projectId: 'bxjqrq',
  e2e: {
    baseUrl: 'https://adoptionsplus-qa.azurewebsites.net/',
    specPattern: "**/*.feature",
    defaultCommandTimeout: 30000,
    requestTimeout: 30000,
    responseTimeout:30000,
    watchForFileChanges: false,
    viewportHeight: 1400,
    viewportWidth: 1600,       
    //supportFile: "cypress/support/e2e.js",
    pageLoadTimeout: 30000,
    testIsolation:false,
    parseSpecialCharSequences:false,
    numTestsKeptInMemory: 0,
    setupNodeEvents,
  },
  
});