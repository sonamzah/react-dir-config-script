#!/usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs");
const { parseOptions, selectDevTools } = require("./options");
const { buildConfigs, addScripts } = require("./buildconfigs");

// ------------------
// Grab provided args.
const [, , ...args] = process.argv;
// Sanitize input arguments (to all lower-case)
args.forEach((arg, i, arr) => (arr[i] = arg.toLowerCase()));

const opts = parseOptions(args);

// ------------------
// Start output...
console.log(`--- Installing and configuring tools ---`);
console.log("`````````````````````````````````````````");
console.log("");
// ------------------
// Array of commands to exec
const commands = [];
// String containing options (which dev tools to install)
const dependDev = selectDevTools(opts);
// Required dependencies
const depend = "react react-dom";

// ------------------
// ------------------
// todo
// 1. Check if node and npm are installed
// ---
// create an open loop response app... "would you like to install node & npm? Y/N"

// 2. Init? -- initailizes project w/ npm if not already done
const pkgPath = "./package.json";
if (!fs.existsSync(pkgPath)) commands.push("npm init -y");

// 3. Add Dev-Dependencies to commands arr
dependDev.forEach((dep) => commands.push("npm i -D " + dep));

// 4. Add Build/Production Dependencies to commands arr
commands.push("npm i " + depend);

// ------------------
// Run commands with exec
// ------------------
console.log("EXECUTING... ⬇️");
commands.forEach((comm) => {
  console.log(comm + " ⚡️");
  try {
    execSync(comm);
  } catch (err) {
    console.log(err + " 🧨");
  }
});

console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");
console.log("````````````````````````````````````````````");
console.log("");

// ------------------
// Build config files for installed tools
// Then add npm scripts to run tools
// ------------------
buildConfigs(opts)
  .then(() => {
    console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");
    console.log("````````````````````````````````````````````");
    console.log("");
    return addScripts(opts);
  })
  .then(() => {
    // Formatting package.json w/ prettier
    // checks if prettier was set to install and if npm script exists
    if (opts.a || opts.p) execSync("npm run format");
    console.log("React project is now ready... 🦄");

    console.log("");
    console.log("🧠🧠🧠🧠🧠🧠🧠");
    console.log("💥 WARNING 💥");
    console.log("You may want to run:");
    console.log("npm audit fix");
    console.log("if using parcel...");
    console.log("");
    console.log("💥 WARNING 💥");
    console.log(
      "Please make sure the following (in package.json) accurately reflect your new project:"
    );
    console.log("-- Project entry point (property 'main' of package.json)");
    console.log(
      "-- REGEX paths specified for each npm script (values of each sub-property, found at property 'scripts' of package.json)"
    );
  })
  .catch((err) => console.log(err + " 🧨"));

// Note -- couldnt get iiafe to execute(?) so used methods from Promise ^
