// const parseArgs = require("minimist"); //may use minimist for more advanced options
const PREF_ARGS = [
  "prettier",
  "eslint",
  "eslint-config-prettier",
  "parcel",
  "@babel/eslint-parser",
  "eslint-plugin-import",
  "eslint-plugin-jsx-a11y",
  "eslint-plugin-react",
  "eslint-plugin-react-hooks",
];

// todo:: use minimist for more advanced option parsing
/**
 * @desc Parses arguments for selected options
 * @param array args - options arguments supplied by user in cli when executing ./cli.js
 * @return object, opts = {optionName: boolean} (all true for now)
 */
function parseOptions(args) {
  // Default option -a (all)
  if (!args || args.length === 0) args = ["-a"];
  // Creates options object for processing
  const opts = Object.fromEntries(
    args.map((arg) => [arg.replace("-", ""), true])
  );
  return opts;
}

/**
 * @desc Processes the array of options and creates an array of names for
 * corresponding tools to be installed using execSync in cli.js
 * (For now this function short circuits and returns all preffered tools: PREF_ARGS)
 * @param {*} object opts, - object keys are supplied options, all boolean value true (for now)
 * @returns array of strings - the names of tools to install
 */
function selectDevTools(opts) {
  // 1. Option -a === All tools and config
  if (opts.a) return PREF_ARGS;
  return [];
  // todo:: process options, build array of tools/plugins
  // todo:: to add as dev dependencies
  // 2. Check for specified options
  // let optStr = "";
  // if (opts.p) optStr += resolvedOpts.pt;
}

module.exports = {
  parseOptions,
  selectDevTools,
};

// todo --------------
// Note:: this is an idea i'm saving for later -- may not use -- keeping for train of thought when I come back to this project
// IDEA -- make array or obj key:val pairs
// const resolvedOpts = {
//   pt: "prettier",
//   //linter: es-lint
//   // Note: babel-eslint only installed if parcel installed
//   l: "eslint eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react",
//   lp: "eslint-config-prettier", //should automatically require if both prettier and eslint are displayed
//   pb: "parcel-bundler",
//   h: "eslint-plugin-react-hooks",
//   // Babel-experimental syntax
//   be: "babel-eslint @babel/core @babel/preset-env @babel/plugin-proposal-class-properties @babel/preset-react",
// };
