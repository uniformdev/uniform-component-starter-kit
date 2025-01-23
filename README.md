# Uniform Component Starter Kit v6

This starter is using the latest Next.js 14 (App Router).

## Prerequisites

- A Uniform account with the ability to create a new empty project. If you don't have a Uniform account, you can request a trial account [here](https://uniform.dev/try).
- Node.js LTS and `git` installed on your machine.

## Getting started

### 1. Initial setup

1. Setup your .env file (see .env.example for reference)
   ```bash
   UNIFORM_API_KEY=
   UNIFORM_PROJECT_ID=
   UNIFORM_PREVIEW_SECRET=hello-world
   ```
   > Make sure your API key has "Developer" role to be able to push content.
1. `npm install && npm run init && npm run dev` to install dependencies, set up project and run in dev mode.

### 2. Run locally in dev mode

`npm run dev` to run locally.
At this point, you should be able to browse your site on localhost:3000 and open it in Uniform Canvas.

### 3. Configure Preview URL

Besides live preview, setting the preview URL enables visual in-line editing and experience management of your Next.js app within the Uniform environment. Enabling this is easy:

1. Open your Uniform project's Settings.
1. Open `Canvas Settings` and configure the preview URL to your localhost endpoint: `http://localhost:3000` and use this for your preview path: `/api/preview?secret=hello-world`
   > Consider changing the `secret` in your .env file. That value must match the `secret` query string used in preview url. The preview can point to a local or deployed version of your Next.js app.

### 4. Install the Theme Pack 2 integration

This integration brings Canvas UI extensions for theme management and new useful visual parameters to help control the look and feel of your components.

1. Open your current team page.
   ![Team page](https://res.cloudinary.com/uniform-demos/image/upload/csk-v-next/doc/team_page.png)
1. Navigate to the `Settings` tab, than `Custom Integrations` and add `Theme Pack 2` as a custom integration using this [manifest](https://github.com/uniformdev/uniform-mesh-integrations/blob/canary/integrations/theme-pack-2/mesh-manifest.stable.json).
1. Open your project.
   ![Your project](https://res.cloudinary.com/uniform-demos/image/upload/csk-v-next/doc/project_page.png)
1. Navigate to the `Integrations` tab, find the `Theme Pack 2` integration and install it.
1. Provide your oun color palette or set up it from the code using `npm run push:colors` command. (see `./styles/colors.css`)
1. Provide your oun dimension configuration or set up it from the code using `npm run push:dimensions` command. (see `./styles/dimensions.css`)
1. Provide your oun fonts or set up it from the code using `npm run push:fonts` command. (see `./styles/fonts.css`)
1. Provide your oun border configuration or set up it from the code using `npm run push:borders` command. (see `./styles/border.css`)

⚠️ Important: After each adding new color or font keys you have to rebuild your application, in order to simplify this process you can use Webhook Settings tab to provide rebuild webhook.

### 5. Uniform Data sync

1. Run `npm run push:data` to push data from disk (see `./uniform-data`) to your project.
1. Run `npm run publish:manifest` to publish the manifest with personalization configuration.
1. Run `npm run pull:data` to pull data from uniform to `./uniform-data` folder.
