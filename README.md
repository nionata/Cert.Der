# Cert.Der

## Mini-Project 1 - Web Exploits

### CIS 4930 - Software Security

#### Structure

- cert.der-web: front end
- cert.der-server: back end

### Setup

- Installation
  - Front End
    - `cd cert-der-web && npm i`
    - Create `.env` file in `cert.der-web` and fill out values from `.env.example`
    - Install Homebrew, and run `./dev-setup.sh` script to setup and install keys for running securely
- To run front end, `cd cert.der-web` and run `npm run serve`

#### Adding components

- To add a new component, copy one of the components in the `src/components` folder to a new `.vue` file
- In `main.js`, import the component and use `Vue.component`, like the post component is.

### Deploy

To build the front end, run `npm run build`, and deploy the dist folder.
