# COVID19 Certification application

COVID19 Certification application is a DHIS2 based application which show the list of certifcates of people who completed COVID19 tests and print certificates. It has two sections(tabs), which are *All Certificates* and *Approved Certificates*. *All Certificates* shows the list of all certificates of people who completed COVID19 tests and on the section allows a user of a given role to approve certificate. *Approved Certificates* show a list of certificates which are are approved and allows a user with a given role to print the certificate.  

## Setup

Run `npm install` to install all required dependencies for the app

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`.

This command will require proxy-config.json file available in the root of your source code, usually this file has this format

```
{
  "/api": {
    "target": "https://play.dhis2.org/2.29/",
    "secure": "false",
    "auth": "admin:district",
    "changeOrigin": "true"
  },
  "/": {
    "target": "https://play.dhis2.org/2.29/",
    "secure": "false",
    "auth": "admin:district",
    "changeOrigin": "true"
  }
}

```

We have provided `proxy-config.example.json` file as an example, make a copy and rename to `proxy-config.json`

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/`, this will included a zip file ready for deploying to any DHIS2 instance.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).