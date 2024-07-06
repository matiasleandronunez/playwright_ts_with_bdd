# A Test Automation Framework using Playwright with Typescript bindings

This project is based on my other [repo](https://github.com/matiasleandronunez/typescript_automation_suite) showcases another approach, leveraging mainly Playwright with typescript. 
The [demonstration site](https://practicesoftwaretesting.com) is a live web for the sake of simplicity and resource saving, but can be [hosted or deployed](https://github.com/testsmith-io/practice-software-testing) if you don't want to deal with environment uncertainty

The TAF uses Playwright with TS bindings, POM and Cucumber BBD (but keeps the Playwright runner) and tests in different browsers while dealing with responsiveness of the design.

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