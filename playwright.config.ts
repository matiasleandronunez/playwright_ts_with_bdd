import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './fixtures/fixtureBuilder';

require('dotenv').config();

// @ts-ignore
export default defineConfig<TestOptions>({
    // Look for test files in the "tests" directory, relative to this configuration file.
    testDir: 'tests',

    // Run all tests in parallel.
    fullyParallel: true,

    // Fail the build on CI if you accidentally left test.only in the source code.
    forbidOnly: !!process.env.CI,

    // Retry on CI only.
    retries: process.env.CI ? 2 : 0,

    // Opt out of parallel tests on CI.
    workers: process.env.CI ? 1 : undefined,

    // Reporters to use
    reporter: [
        ['list'],
        ['html', {  open: 'always' }]
    ],

    use: {
        // Base URL to use in actions like `await page.goto('/')`.
        baseURL: 'http://127.0.0.1:3000',

        // Collect trace, see with https://playwright.dev/docs/trace-viewer
        trace: 'on',

        // Collect video of tests being run https://playwright.dev/docs/videos
        video: 'on',

        // Name of the attribute to be used by Locator method getByTestId
        testIdAttribute: 'data-test',
    },



    // Configure projects for major browsers.
    projects: [
        {
            name: 'authenticate',
            testMatch: /.*\.setup\.ts/,
        },
        {
            name: 'frontend-chrome',
            use: { ...devices['Desktop Chrome'],
                headless: process.env.USE_GUI != 'true',
                isResponsive: false,
            },
            dependencies: ['authenticate'],
            testDir: 'tests/frontend'
        },
        {
            name: 'safari-responsive',
            use: { ...devices['iPhone 13'],
                headless: process.env.USE_GUI != 'true',
                isResponsive: true,
            },
            dependencies: ['authenticate'],
            testDir: 'tests/frontend'
        },
    ],

    // Folder for test artifacts such as screenshots, videos, traces, etc.
    outputDir: 'test-results',

});