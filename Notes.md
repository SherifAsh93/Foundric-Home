###### Implementation Notes using PERN Stack

    ## Create frontend and backend folders
    ## In frontend filder create Vite project with React and Javascript
    ## In the backend folder initialize the folder first with npm init
    ## after initialization install express, cors, dotenv, drizzle-orm, pg and clerk/express
    ## Next install DEv dependancies: typescript, ts-node, nodemon, drizzle-kit, @types/express, @types/cors, @types/pg
    ## Folders I will need inside backend: [src => (config, controllers, routes, db)]
    ## but first I need to create tsconfig.json file to make the ts converted to js "I will as Windsuf to create it for me"
    ## inside package.json add "scripts": { "dev": "nodemon" }
    ## I need to add build script in package.json to build the project with "build": "tsc"
    ## inrder to use nodemon instead, I need to create nodemon.json file and inside it I need to add:
    ## "watch": ["src"],
    ## "ignore": ["src/**/*.spec.ts"],
    ## "ext": "ts,js,json,html,css"
    ## "exec": "ts-node src/index.ts"
    ## inside src folder create index.ts file to start the server with

    ### in case I need to push changes to the database, I need to run "npm run db:push"
