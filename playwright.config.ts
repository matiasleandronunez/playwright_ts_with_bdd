import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

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
    reporter: [
        ['list'],
        ['html', {  open: 'always' }]
    ],

    use: {
        // Base URL to use in actions like `await page.goto('/')`.
        baseURL: 'http://127.0.0.1:3000',

        // Collect trace, see with https://playwright.dev/docs/trace-viewer
        trace: 'retain-on-failure',

        // Collect video of tests being run https://playwright.dev/docs/videos
        video: 'retain-on-failure',

        // Name of the attribute to be used by Locator method getByTestId
        testIdAttribute: 'data-test',
    },



    // Configure projects for major browsers.
    projects: [
        {
            name: 'setup',
            testDir: defineBddConfig({
                disableWarnings: { importTestFrom: true },
                outputDir: '.test-results/user',
                importTestFrom: './steps/fixtureBuilder.ts',
                paths: ['./features/setup/setup.feature'],
                require: ['./steps/frontend/*.ts'],
            }),
            use: { ...devices['Desktop Chrome'],
                headless: process.env.USE_GUI != 'true',
                isResponsive: false,
            },
        },
        {
            name: 'backend',
            testDir: defineBddConfig({
                disableWarnings: { importTestFrom: true },
                outputDir: '.test-results/product',
                importTestFrom: './steps/fixtureBuilder.ts',
                paths: ['./features/backend/product.feature'],
                require: ['./steps/backend/*.ts'],
            }),
            dependencies: ['setup'],
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
                storageState: './test-data/.auth',
                isResponsive: false,
            },
            dependencies: ['setup'],
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
                storageState: './test-data/.auth',
            },
            dependencies: ['setup'],
        },
        {
            name: 'non-functional',
            testDir: defineBddConfig({
                disableWarnings: { importTestFrom: true },
                outputDir: '.test-results/non-functional',
                importTestFrom: './steps/fixtureBuilder.ts',
                paths: ['./features/non-functional/*.feature'],
                require: ['./steps/**/*.ts'],
            }),
            use: { ...devices['Desktop Chrome'],
                headless: process.env.USE_GUI != 'true',
                storageState: './test-data/.auth',
                isResponsive: false,
            },
            dependencies: ['setup'],
        },
    ],

    // Folder for test artifacts such as screenshots, videos, traces, etc.
    outputDir: 'test-results',

});