# A Test Automation Framework implementing BDD and Playwright with Typescript bindings

### Why BDD? Do I need it?
BDD is in my opinion a great communication tool which can also help with technical aspects of automation such as dealing with behaviour repetition and the code implications of it, having reusable steps certainly help keep code DRY! However BDD is not pure math, there are a lot of reasons and contexts where it is indifferent or even not advisable to use it. Make your own judgement based on the many articles on the matter, if you decide to go with it then this repo is a great start. If not you may find this [repo](https://github.com/matiasleandronunez/typescript_automation_suite) useful, or I've also [branched an early version this repo](https://github.com/matiasleandronunez/playwright_ts_with_bdd/tree/release/without_bdd) before implementing BDD.

### Intro
This project is based on my other [repo](https://github.com/matiasleandronunez/typescript_automation_suite) but showcases another approach, leveraging BDD with Playwright + typescript. 
The [demonstration site](https://practicesoftwaretesting.com) targeted by the tests is a live web for the sake of simplicity and resource saving, but can be [hosted or deployed](https://github.com/testsmith-io/practice-software-testing) if you don't want to deal with environment uncertainty.

As mentioned, the TAF uses Playwright with TS bindings, POM, Cucumber BBD and tests in different browsers while dealing with responsiveness of the design.
Mind a _very important_ note though! This repo implements Cucumber BDD with the [playwright-bdd](https://github.com/vitalets/playwright-bdd) package, not the other way around -that is Cucumber and Playwright as a library- So it keeps all the advantages of Playwright runner plus the benefits of writting scenarios in gherkin syntax.

### Setup - Local
*Make sure node > 20 and npm > 10 is installed*

After cloning the repo, install all required dependencies with npm
```shell
 npm install 
 ```
Install browsers
```shell
 npm playwright install 
 ```

All set! Run tests with the bash script provided:
```shell
sh ./run_regression.sh
```
or taylor the run command as needed
```shell
npx bddgen && npx playwright test --reporter=list --config=playwright.config.ts
```

### Setup - with Docker
You can build the docker container with all the necessary dependencies by using the provided Dockerfile:

```shell 
docker build . -t <yourTagName>
```
Then run and connect to the container

```shell 
docker run -i -t <yourTagName> /bin/bash
```
Once in the container, you will land in the working directory ```/automation``` simply execute the bash script ``` run_regression.sh ```

```shell
sh ./run_regression.sh
```

### Execute in workflow with Github Actions
There's a GH worflow .yml file included for convinience and to serve as practical example if automation needs to be implemented in a pipeline. To use it fork this repo and run the workflow from a dispatch event (It's also configured to run on some pull request triggers)
