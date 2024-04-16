## Uniform Component Starter Kit

The Component Starter kit gives you the key building blocks to create dynamic and compelling web experiences and demonstrate the power of digital experience composition in Uniform. Just install, customize and start creating.

Built with love by Uniform folks, standing on the shoulders of TailwindCSS, DaisyUI, React and Next.js.

<a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Funiformdev%2Funiform-component-starter-kit&env=UNIFORM_API_KEY,UNIFORM_PROJECT_ID"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>

- [Demo](https://components.uniform.app/)
- [Storybook](https://components-storybook.uniform.app/)
- [Complete tutorial](https://docs.uniform.app/docs/learn/tutorials/csk)
 
### Prerequisites

- A Uniform account with the ability to create a new empty project. If you don't have a Uniform account, you can request a trial account [here](https://uniform.dev/try).

### Setup own project and start locally

1. In your terminal, from the project root, run the following command and follow the instructions:

   ```bash
   npm run cli
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
The project is connected to your Uniform project. Changes you make an publish on Uniform will reflect in this local project.

### Manual Uniform Project Setup

1. Clone this repo onto your local machine
2. Create a new project at https://uniform.app. Give it a name and select "Empty Project".
3. Under your team's Security settings, create an API Key with full permissions to Canvas and Context.
4. Copy your API Key, Project ID, and Quick Connect Key. You will add these to your `.env` file (see below) and to the Uniform Chrome extension respectively. It is important to note that once you close the API Key window you're unable to copy the API or Quick Connect key values again. If you do close the API Key window before copying you will need to go through the API Key creation process again.
5. In your new project, navigate to "Settings -> Canvas Settings" and add `http://localhost:3000/api/preview?secret=hello-world` into the Preview URL and click "Save". This allows you to preview your project as you develop.

6. Setup your .env file (see .env.example for reference)
   ```bash
   UNIFORM_API_KEY=
   UNIFORM_PROJECT_ID=
   UNIFORM_PREVIEW_SECRET=hello-world
   ```
7. `npm install`
8. Run `npm run uniform:push` and `npm run uniform:publish` to push the content from this starter kit (components, compositions and project map) into your project.
9. Run `npm run dev` to run in dev mode locally, or `npm run build && npm start` to run in prod mode locally.

### Manual Theme Pack integration Setup

This integration brings Canvas UI extensions for theme management and new useful visual parameters to help control the look and feel of your components.

1. Open your Uniform project.
1. Head over to Settings > Canvas and configure preview to http://your-host/api/preview?secret=hello-world
1. Navigate to `Manage Integrations` tab and Install `Theme Pack` integration
1. Select on of the themes or create your own and press `Save`
1. Go to Components list, find the "Header" component - "Main Header" pattern and edit it.
1. In order to apply theme changes, press `Publish` (even if the pattern itself is not changed).
   > Optionally, you can change the main font that will be used along with the theme.
   > Here you can also manage your header and footer content - logo and navigation links.

Important: in order to apply theme changes, you must re-publish the "Main Header" pattern after every time you change the `theme` on the integration settings page.

### Scaffold

For the convenient and fast generation of React components based on your canvas components, you can use the Scaffold CLI. Follow the instructions:

1. In your terminal, from the project root, run the following command:

   ```bash
   npm run scaffold
   ```

1. Select necessary component from list. All necessary files as well as registration of this component will be added automatically
1. If the application is running in build mode, you must re-run the build command and start it again (`npm run build && npm start`). For an application running in development mode, just enjoy the new component
1. You can also customize new components. They will be located in the common canvas folder

### Additional examples

This package contains an additional set of examples based on the Component Starter Kit components:

1. Coveo Search Page
1. Algolia Search Page

## Documentation

For the complete walkthrough tutorial, check out [this doc](https://docs.uniform.app/docs/learn/tutorials/csk).
