# ChatPotion Installer

Install all 21 ChatPotion themes for The Lounge IRC client with one command.

## Install all themes

```bash
npx chatpotion-installer
```

The installer will display the included themes and ask for confirmation.

To skip confirmation:

```bash
npx chatpotion-installer --accept
```

## Debian and Ubuntu package installations

If The Lounge was installed using the official `.deb` package, run the installer as the `thelounge` system user:

```bash
sudo -u thelounge -H npx --yes chatpotion-installer --accept
```

Restart The Lounge afterward:

```bash
sudo systemctl restart thelounge.service
```

Then open:

```text
Settings → Appearance
```

## Preview without installing

```bash
npx chatpotion-installer --dry-run
```

## Included themes

1. Arctic Aurora
2. Ayu Mirage
3. Catppuccin Mocha
4. Crimson Noir
5. Cyberpunk Neon
6. Deep Sea Cyan
7. Dracula Soft
8. Everforest Dark
9. Forest Night
10. GitHub Dark
11. Gruvbox Material
12. Kanagawa Wave
13. Matrix Terminal
14. Midnight Sapphire
15. Monokai Pro
16. Nord Frost
17. One Dark Pro
18. Rosé Pine Moon
19. Solarized Night
20. Synthwave Sunset
21. Tokyo Night

## Individual theme installation

Every theme can also be installed separately:

```bash
thelounge install thelounge-theme-chatpotion-theme-name
```

Example:

```bash
thelounge install thelounge-theme-chatpotion-midnight-sapphire
```

## Links

- GitHub: https://github.com/ggvolta/ChatPotion
- npm packages: https://www.npmjs.com/~ggvolta
- Issues: https://github.com/ggvolta/ChatPotion/issues

ChatPotion is free and open source.