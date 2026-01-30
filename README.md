# brain-rot-player

Play brain-rot videos (or a game) in a VS Code webview while you code.

## Features

- Launch a quick-pick of brain-rot options from the Command Palette.
- Plays a video in an embedded webview with controls.
- Includes an option to open a Subway Surfers game in an iframe.

## Requirements

- VS Code ^1.108.1
- An internet connection for remote video/game URLs

## Usage

1. Open the Command Palette (`Cmd+Shift+P` on macOS, `Ctrl+Shift+P` on Windows/Linux).
2. Run `Brainrot`.
3. Pick an option from the list.

## Commands

- `brain-rot-player.brainrot`: Open the brain-rot picker and play the selected item.

## Configuration

This extension currently does not contribute any settings.

## Customizing content

Video and game URLs are hardcoded in `src/extension.ts`. To add or replace items:

1. Update the `options` array.
2. Add a matching entry in `videoUrls`.
3. Rebuild the extension (`npm run compile`).

## Known issues

- Some options still use `REPLACE_WITH_URL` placeholders and will show an info message when selected.
- Remote content availability and playback depends on the hosting source.

## Release notes

### 0.0.1

- Initial preview release.

## Development

- `npm run compile` builds the extension.
- `npm run watch` rebuilds on change.
- `npm run lint` runs ESLint.



## Credits

- Subway Surfers game embed: CodeSandbox demo by <author/handle if known> (https://codesandbox.io/p/sandbox/subway-surfers-ly4fsf)

