# Uniform Component Starter Kit (CSK6) (Deprecated, please use https://github.com/uniformdev/component-starter-kit-next-approuter/tree/release/6.0.0 repository or npx @uniformdev/cli@20.4.1-alpha.5 new)

This repository is the latest version 6 of the Uniform Component Starter Kit (CSK).
It is built using Next.js 15 App Router, TailwindCSS and TypeScript.

Check out more about CSK and what you can do with it at https://components.uniform.app

## Prerequisites

- A Uniform account with the ability to create a new empty project. If you don't have a Uniform account, you can request a trial account [here](https://uniform.dev/try).
- Node.js LTS and `git` installed on your machine.

## Getting started

### Step 1. Initial setup

#### Option 1: via Uniform CLI

Run `npx @uniformdev/cli new` and pick `Next.js` -> `Component Starter Kit` from the interactive prompt. Complete the process to deploy a new instance of CSK to your 

#### Option 2: manually
1. `git clone` this repo.
1. Create an empty Uniform project in your team.
1. Setup your .env file using your Uniform project connection details (see .env.example for reference)
   ```bash
   UNIFORM_API_KEY=
   UNIFORM_PROJECT_ID=
   UNIFORM_PREVIEW_SECRET=hello-world
   ```
   > Make sure your API key has "Developer" role to be able to push content.
1. `npm install` to install dependencies
1. Run `npm run init` to initialize your project. This will push all content from disk (`.\content` folder) and your design settings (colors, fonts, borders, etc. for this default theme).

### Step 2. Run locally in dev mode

Use `npm run dev` to run locally.
At this point, you should be able to browse your site on localhost:3000 and open your Uniform projects compositions for preview and visual editing.

### Step 3. Install the Design Extensions integration

This integration brings new parameter types for design and layout control via Uniform UI extensions to help control and manage the look and feel of your components.

1. Open your current team page.
   ![Team page](https://res.cloudinary.com/uniform-demos/image/upload/csk-v-next/doc/team_page.png)
1. Navigate to the `Settings` tab, than `Custom Integrations` and add `Design Extensions` as a custom integration using this [manifest](https://github.com/uniformdev/uniform-mesh-integrations/blob/canary/integrations/design-extensions/mesh-manifest.stable.json).
1. Open your project.
   ![Your project](https://res.cloudinary.com/uniform-demos/image/upload/csk-v-next/doc/project_page.png)
1. Navigate to the `Integrations` tab, find the `Design Extensions` integration and install it.

## How to sync content 

The following scripts are created to facilitate sync of content from / to your project and source control. The representation of your project on disk is stored int the `./contnet` folder.

1. Run `npm run push:data` to push data from disk (see `./content`) to your project.
1. Run `npm run pull:data` to pull data from uniform to `./content` folder.

## Other scripts

### Design Extension sync

TODO: need more work here
⚠️ Important: After each adding new color or font keys you have to rebuild your application, in order to simplify this process you can use Webhook Settings tab to provide rebuild webhook.

1. Provide your own color palette or set up it from the code using `npm run push:colors` command. (see `./styles/colors.css`)
1. Provide your own dimension configuration or set up it from the code using `npm run push:dimensions` command. (see `./styles/dimensions.css`)
1. Provide your own fonts or set up it from the code using `npm run push:fonts` command. (see `./styles/fonts.css`)
1. Provide your own border configuration or set up it from the code using `npm run push:borders` command. (see `./styles/border.css`)

### Publishing manifest file via CLI

1. Run `npm run publish:manifest` to publish the manifest with A/B testing and personalization configuration.
