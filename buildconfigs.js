const { readFileSync, promises } = require("fs");

// todo:: figure out which lines depend on the other options and separate them into chunks?
// todo:: take NOTE of the fact that 'fileWrite' overwrites everything
const eslintrc = {
  file: `.eslintrc.json`,
  contents: `{
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
}`,
};

const prettierrc = {
  file: ".prettierrc",
  contents: "{}",
};

const gitignore = {
  file: ".gitignore",
  contents: `node_modules/
.DS_Store
.cache/
dist/
coverage/
.vscode/
.env/`,
};

const configs = [prettierrc, eslintrc, gitignore];

// Error handling wrapper
// wrtieFileHErr == "write-file-handle-errors"
// --- not the best name 🤷🏼‍♂️
async function writeFileHErr(file, contents) {
  try {
    await promises.writeFile(file, contents);
  } catch (err) {
    console.log(err);
  }
}

/**
 * @desc Writes config files for tools specified (all right now) as options
 * @param object opts - object keys are supplied options, all boolean value true (for now)
 * @return undefined -- simply writes to fs
 */
async function buildConfigs(opts) {
  console.log("Building config files now... ⬇️");
  if (opts.a) {
    // Await does not work inside Array.forEach
    for (const conf of configs) {
      await writeFileHErr(conf.file, conf.contents);
      console.log(`config file: ${conf.file} has been created 📜`);
    }
    return;
  }
  return console.log("-- No config files added --");
  //
  // (opts.pb&&opts.be)? await writeConfig(___) : await writeConfig(something else)
}

/**
 * @desc Adds npm scripts to run selected tools (All for now)
 * @param object opts - object keys are supplied options, all boolean value true (for now)
 * @return undefined -- simply reads, edits and writes to file: package.json
 */
async function addScripts(opts) {
  console.log("Adding npm scripts to package.json... ⬇️");
  const path = "./package.json";

  let scripts = {
    dev: "parcel src/index.html",
    "dev:mock": "cross-env PET_MOCK=mock npm run dev",
    format: 'prettier "./**/*.{js,html,json}" --write',
    lint: 'eslint "./**/*.{js,jsx}" --quiet',
    test: 'echo "Error: no test specified" && exit 1',
  };
  // todo:: change logic here when you add more options processing
  // right now this is just handling an edge-case for current functionality
  if (!opts.a) scripts = { test: 'echo "Error: no test specified" && exit 1' };

  try {
    const data = readFileSync(path, "utf8");
    const obj = JSON.parse(data);

    obj.scripts = scripts;

    await writeFileHErr(path, JSON.stringify(obj));

    console.log("-------------");
    opts.a
      ? console.log("Npm scripts added to package.json! 🦖")
      : console.log("-- No npm scripts added to package.json --");
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  buildConfigs,
  addScripts,
};

// todo:: maybe remove this??? probably wont do it this way...
// const configSettings = {
//   //prettier
//   pt: { file: ".prettierrc", contents: "{}" },
//   //linter: es-lint
//   // Note: babel-eslint only installed if parcel installed
//   l: {
//     file: ".eslintrc.json",
//     contents: `{
// 			“extends”: [ “eslint:recommended”],
//             “plugins”: [],
//             “parser options”: {
//             “ecmaVersion”:  2018,
//             “sourceType”: “module”,
//             “ecmaFeatures”: {
// 	                “jsx”: true
//                     }
//             },
//             “env”: {
//                 “es6”: true,
//                 “browser”: true,
//                 “node”: true
//             }
//         }
//     `,
//   },
//   lp: {
//     file: ".eslintrc.json",
//     contents: `{
// 			“extends”: [ “eslint:recommended”, “prettier”, “prettier/react”],
//             “plugins”: [],
//             “parser options”: {
//             “ecmaVersion”:  2018,
//             “sourceType”: “module”,
//             “ecmaFeatures”: {
// 	                “jsx”: true
//                     }
//             },
//             “env”: {
//                 “es6”: true,
//                 “browser”: true,
//                 “node”: true
//             }
//         }
//     `,
//   }, //should automatically require if both prettier and eslint are displayed
//   pb: "parcel-bundler",
//   h: "eslint-plugin-react-hooks",
//   // Babel-experimental syntax
//   be: "babel-eslint @babel/core @babel/preset-env @babel/plugin-proposal-class-properties @babel/preset-react",
//   git: {
//     file: ".gitignore",
//     contents: `
//             node_modules/
// 			.DS_Store
// 			.cache/
// 			dist/
// 			coverage/
// 			.vscode/
// 			.env/
//         `,
//   },
// };
