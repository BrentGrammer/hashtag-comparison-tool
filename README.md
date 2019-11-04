# Find Common

[Working App Deployed on Firebase](https://hashtag-compare-app.firebaseapp.com/)

### Prerequisites:

- Angular 8 CLI
- Node

### To run the app in Development:

- `npm install`
- `ng serve`

## DEPLOYMENT

### PREPARING FOR DEPLOYMENT:

- Install Firebase cli if needed: `npm install -g firebase-tools`

- Use Environment variables:

  - In src/environments/environment.prod.ts or src/environments/environment.ts files, you can set key value pairs for environment variables
    _NOTE: Angular automatically switches out the variables for prod and development (based on the file)_

  - In the file you want to use the env variable:

    ```javascript
    import { environment } from "../environments/environment";

    const apikey = environment.myApiKey;
    ```

- Build the app (run this in the project folder): `ng build --prod`

### DEPLOYING TO FIREBASE HOSTING

1. `ng build --prod`
1. `firebase login`
1. `firebase init` (In Angular project folder) to link the project to Firebase:
   - Select the Hosting option, press `spacebar` and `Enter`
   - Create a new project if not done already (_NOTE: name must be unique and not taken_)
   - Select `y` to make the app a SPA and reroute all requests to index.html
   - Set the build folder to dist/<YourAppName> -- check the folder name in your project where your index.html is in the built files
   - **Do NOT overwrite the Index.html** - select `n`
1. `firebase deploy`
