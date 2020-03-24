# Cert.Der

## Mini-Project 1 - Web Exploits

### CIS 4930 - Software Security

- Secure - https://certder.appspot.com/secure
- Insecure - https://certder.appspot.com/insecure

#### Structure

- cert.der-web: front end
- cert.der-server: back end

### Setup

- Installation
  - Front End
    - `cd cert-der-web && npm i`
    - Create `.env` file in `cert.der-web` and fill out values from `.env.example`
    - Install Homebrew, and run `npm run setup` to setup and install keys for running securely
  - Back End
    - Make sure serverless is installed globally
    - fill out `.env` from `.env.example`
    - Get credentials for Google Cloud, and place in `~/.gcloud` directory
    - To deploy, run `sls deploy`
  
- To run front end locally, `cd cert.der-web` and run `npm run serve`

#### Adding components

- To add a new component, copy one of the components in the `src/components` folder to a new `.vue` file
- In `main.js`, import the component and use `Vue.component`, like the post component is.

### Deploy

Master branch has a hook that auto builds and deploys through Google App Engine
