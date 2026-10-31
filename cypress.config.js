const { defineConfig } = require('cypress')

module.exports = defineConfig({
  watchForFileChanges: false,
  video: false,
  viewportWidth: 1366,
  viewportHeight: 768,
  defaultCommandTimeout: 10000,
  // Reexecuta 1x no modo headless (CI) para absorver instabilidade do site público
  retries: { runMode: 1, openMode: 0 },
  // Bloqueia anúncios do Google que abrem pop-ups/vinhetas e deixam o site instável
  blockHosts: [
    '*googlesyndication.com',
    '*doubleclick.net',
    '*googleadservices.com',
    '*google-analytics.com',
    '*googletagmanager.com',
    '*adtrafficquality.google',
    '*fundingchoicesmessages.google.com',
  ],
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportPageTitle: 'Trabalho Final - Automation Exercise',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    baseUrl: 'https://automationexercise.com',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
    },
  },
})
