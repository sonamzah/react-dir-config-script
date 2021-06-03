# React-dir-config-script

This is a simple Node command-line scripts that will install tools and set up your directory for building a React project. Pretty basic config and tooling which should be sufficient for most beginners and useful to many masters! 

Depending on the project more advanced devs prefer:
    Yarn > npm
    Webpack > Parcel

NOTE -- I have left several dev comments and todo's in the code. 
        While the project does what I want it to now, in the future I want to add more advanced options seelections for maximum customizability. The comments are trains of thought I think will be helpful for me when I come back to this project.

-------------------------------------------------------------------------------------------------------
-----------------------------------------------------------
-----------------------
-----------------------

INSTALLATION: 

npm i react-strt

or

npm install react-strt

-----------------------

USAGE: 
(see numbered list below for details on what its doing)

react-strt         
react-strt -a
react-strt -A

react-strt *  
(* means any other argument -- Installs only dependencies, no dev dependencies)

NOTE -- if you do not run: 'npm init' before running 'react-strt' this script will run 'npm init -y'

OPTIONS:
For now the only supported option is:
-a/-A
which stands for ALL -- installing EVERY tool listed above 
supplying NO argument options will default to -a (ALL)

** My option parsing game in this script is pretty weak. For future updates I may employ a package called 'minimist' (https://www.npmjs.com/package/minimist) which is a really cool project that has pretty nice option arguments parsing features.

** For what I wanted to get done (which was automating tools installation and config) adding advanced options processing was looking like it was going to take more time than I would have liked so I short-circuited much of the options logic for now! (it might look a little weird -- if you glance at the code, but Im leaving it for preservation of train of thought for when I pick it up again!)

Currently this script will:
1. Run: 'npm init -y' 
   
   (if npm project is not already started -- i.e. no package.json file is detected)
   ** Warning: Only run this script in the root directory of your project **

2. Install all of the following as dev dependencies: 
"prettier",
"eslint",
"eslint-config-prettier",
"parcel",
"@babel/eslint-parser",
"eslint-plugin-import",
"eslint-plugin-jsx-a11y",
"eslint-plugin-react",
"eslint-plugin-react-hooks",

using 'npm i -D _____'

3. Create the followng simple config files in current directory (should be Root of your project):
    
    .prettierrc: {}

    .eslintrc.json: 
{
"extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier"
],
"rules": {
    "react/prop-types": 0,
    "no-console": 1,
    "react-hooks/rules-of-hooks": 2,
    "react-hooks/exhaustive-deps": 1
},
"plugins": ["react", "import", "jsx-a11y", "react-hooks"],
"parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
    "jsx": true
    }
},
"env": {
    "es6": true,
    "browser": true,
    "node": true
},
"settings": {
    "react": {
    "version": "detect"
        }
    }
}

.gitignore: 
node_modules/
.DS_Store
.cache/
dist/
coverage/
.vscode/
.env/

4. Adds the following 'npm scripts' to package.json for manual execution of the tools

    "scripts" : 
{
"dev": "parcel src/index.html",
"dev:mock": "cross-env PET_MOCK=mock npm run dev",
"format": "prettier \"./**/*.{js,html,json}\" --write",
"lint": "eslint \"src/**/*.{js,jsx}\" --quiet",
"test": "echo \"Error: no test specified\" && exit 1"
},

- Run any of the above with:
'npm run ____'

ex. 
npm run dev

*** NOTE -- "test" is the default script that is created when package.json is created... I just left it there

-----------------------

** FUTURE PLANS **

- When I have some time and do some more research on cli app conventions and best practices, specifically regarding options parsing and processing I will make this 'configuration'/'set-up'/'tooling' script more robust and experiment with more customizability. 

- I want to be able to easily select from the best tools and automatically set up my react project directory the way I want

- In the future I aim to add support for yarn and other tools that I have undoubtedly not discovered yet...

- Also, if it wasnt clear already I want to be able to specify select combinations of all tools for fully customizatible configurations depending on how light-weight or robust of a React project I will be building.

---------------------------------

** ALTERNATIVE IMPLEMENTATION ** 

- Another thing I realized while building this was the posibility of using the power of npm to shortcut a lot of the work (maybe)

- Since npm (and Im assuming yarn I havnt used it much yet but it seems pretty similar) allows you to install all pre-set dependencies after downloading the package -- using 'npm i' or 'npm install' (longhand)

- I/me/you/one could implement a CLI script like this (react-strt) by adding the preferred tools to:
-- 'devDependencies': {}
&
-- 'dependencies': {}

- in package.json -- using some file system read and write libs and then finally running 'npm install'

- This seems to prevent the need for making any execution calls to the command line 
(aside from maybe 'npm init')

- Leaving npm to handle all the installation itself... nice 😎.

