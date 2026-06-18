#!/usr/bin/env node

"use strict";

const { spawnSync } = require("node:child_process");
const readline = require("node:readline");

const themePackages = [
  "thelounge-theme-chatpotion-arctic-aurora",
  "thelounge-theme-chatpotion-ayu-mirage",
  "thelounge-theme-chatpotion-catppuccin-mocha",
  "thelounge-theme-chatpotion-crimson-noir",
  "thelounge-theme-chatpotion-cyberpunk-neon",
  "thelounge-theme-chatpotion-deep-sea-cyan",
  "thelounge-theme-chatpotion-dracula-soft",
  "thelounge-theme-chatpotion-everforest-dark",
  "thelounge-theme-chatpotion-forest-night",
  "thelounge-theme-chatpotion-github-dark",
  "thelounge-theme-chatpotion-gruvbox-material",
  "thelounge-theme-chatpotion-kanagawa-wave",
  "thelounge-theme-chatpotion-matrix-terminal",
  "thelounge-theme-chatpotion-midnight-sapphire",
  "thelounge-theme-chatpotion-monokai-pro",
  "thelounge-theme-chatpotion-nord-frost",
  "thelounge-theme-chatpotion-one-dark-pro",
  "thelounge-theme-chatpotion-rose-pine-moon",
  "thelounge-theme-chatpotion-solarized-night",
  "thelounge-theme-chatpotion-synthwave-sunset",
  "thelounge-theme-chatpotion-tokyo-night"
];

const args = process.argv.slice(2);

const hasArg = (...values) => {
  return values.some((value) => args.includes(value));
};

const showHelp = () => {
  console.log(`
ChatPotion Installer

Installs all 21 ChatPotion themes for The Lounge IRC client.

Usage:
  npx chatpotion-installer
  npx chatpotion-installer --accept
  npx chatpotion-installer --dry-run

Options:
  --accept, -y   Install without asking for confirmation
  --dry-run      Show all included packages without installing
  --help, -h     Show this help message
`);
};

const showPackages = () => {
  console.log("\nIncluded ChatPotion themes:\n");

  themePackages.forEach((packageName, index) => {
    const number = String(index + 1).padStart(2, "0");

    console.log(`${number}. ${packageName}`);
  });
};

const askQuestion = (question) => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
};

const getTheLoungeCommand = () => {
  if (process.platform === "win32") {
    return "thelounge.cmd";
  }

  return "thelounge";
};

const runTheLounge = (commandArgs, stdio = "inherit") => {
  return spawnSync(getTheLoungeCommand(), commandArgs, {
    stdio,
    encoding: "utf8",
    shell: process.platform === "win32"
  });
};

const checkTheLounge = () => {
  const result = runTheLounge(
    ["--version"],
    ["ignore", "pipe", "pipe"]
  );

  if (result.error || result.status !== 0) {
    console.error("\nThe Lounge command could not be found.");
    console.error(
      "Make sure The Lounge is installed and the 'thelounge' command is available."
    );

    console.error(
      "\nDebian package users should run this installer as the 'thelounge' system user."
    );

    return false;
  }

  const version = result.stdout?.trim();

  if (version) {
    console.log(`\nThe Lounge detected: ${version}`);
  } else {
    console.log("\nThe Lounge installation detected.");
  }

  return true;
};

const installAllThemes = () => {
  const installed = [];
  const failed = [];

  console.log("\nInstalling all 21 ChatPotion themes...");

  themePackages.forEach((packageName, index) => {
    console.log(
      `\n[${index + 1}/${themePackages.length}] Installing ${packageName}`
    );

    const result = runTheLounge([
      "install",
      packageName
    ]);

    if (result.error || result.status !== 0) {
      failed.push(packageName);
      console.error(`Failed: ${packageName}`);
      return;
    }

    installed.push(packageName);
    console.log(`Installed: ${packageName}`);
  });

  console.log("\n========================================");
  console.log("ChatPotion installation summary");
  console.log("========================================");
  console.log(`Successfully installed: ${installed.length}`);
  console.log(`Failed: ${failed.length}`);

  if (failed.length > 0) {
    console.log("\nFailed packages:");

    failed.forEach((packageName) => {
      console.log(`- ${packageName}`);
    });

    console.log("\nYou can run the installer again to retry.");

    process.exitCode = 1;
    return;
  }

  console.log("\nAll 21 ChatPotion themes were installed successfully!");
  console.log("Restart The Lounge if the themes are not visible.");
  console.log("Then open Settings → Appearance to select a theme.");
};

const main = async () => {
  if (hasArg("--help", "-h")) {
    showHelp();
    return;
  }

  console.log("========================================");
  console.log("       ChatPotion Theme Installer");
  console.log("========================================");

  showPackages();

  if (hasArg("--dry-run")) {
    console.log("\nDry run complete. Nothing was installed.");
    return;
  }

  if (!checkTheLounge()) {
    process.exitCode = 1;
    return;
  }

  if (!hasArg("--accept", "-y")) {
    const answer = await askQuestion(
      "\nInstall all 21 ChatPotion themes? (y/N): "
    );

    if (answer !== "y" && answer !== "yes") {
      console.log("\nInstallation cancelled.");
      return;
    }
  }

  installAllThemes();
};

main().catch((error) => {
  console.error("\nUnexpected installer error:");
  console.error(error);

  process.exitCode = 1;
});