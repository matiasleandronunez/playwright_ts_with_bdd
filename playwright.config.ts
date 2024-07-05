import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig, cucumberReporter } from 'playwright-bdd';

import type { TestOptions } from './steps/fixtureBuilder';

require('dotenv').config();

// @ts-ignore
export default defineConfig<TestOptions>({
    // Run all tests in parallel.
    fullyParallel: true,

    // Fail the build on CI if you accidentally left test.only in the source code.
    forbidOnly: !!process.env.CI,

    // Retry on CI only.
    retries: process.env.CI ? 2 : 0,

    // Opt out of parallel tests on CI.
    workers: process.env.CI ? 1 : undefined,

    // Reporters to use
    reporter: [cucumberReporter('html', { outputFile: 'cucumber-report/report.html' })],

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
            testDir: defineBddConfig({
                disableWarnings: { importTestFrom: true },
                outputDir: '.test-results/authenticate',
                importTestFrom: './steps/fixtureBuilder.ts',
                paths: ['./features/authenticate/*.feature'],
                require: ['./steps/authenticate/*.ts'],
            }),
        },
        {
            name: 'frontend-chrome',
            testDir: defineBddConfig({
                disableWarnings: { importTestFrom: true },
                outputDir: '.test-results/frontend-chrome',
                importTestFrom: './steps/fixtureBuilder.ts',
                paths: ['./features/frontend/*.feature'],
                require: ['./steps/frontend/*.ts'],
            }),
            use: { ...devices['Desktop Chrome'],
                headless: process.env.USE_GUI != 'true',
                isResponsive: false,
            },
            dependencies: ['authenticate'],
        },
        {
            name: 'safari-responsive',
            testDir: defineBddConfig({
                disableWarnings: { importTestFrom: true },
                outputDir: '.test-results/safari-responsive',
                importTestFrom: './steps/fixtureBuilder.ts',
                paths: ['./features/frontend/*.feature'],
                require: ['./steps/frontend/*.ts'],
            }),
            use: { ...devices['iPhone 13'],
                headless: process.env.USE_GUI != 'true',
                isResponsive: true,
            },
            dependencies: ['authenticate'],
        },
    ],

    // Folder for test artifacts such as screenshots, videos, traces, etc.
    outputDir: 'test-results',

});