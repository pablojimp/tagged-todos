# Tagged TODOs

> Write `TODO[tag]: text` in your code and see every TODO grouped by tag in its own sidebar view.

[![Marketplace](https://img.shields.io/visual-studio-marketplace/v/pablojimp.tagged-todos?label=Marketplace)](https://marketplace.visualstudio.com/items?itemName=pablojimp.tagged-todos)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/pablojimp.tagged-todos)](https://marketplace.visualstudio.com/items?itemName=pablojimp.tagged-todos)
![VS Code](https://img.shields.io/badge/VS%20Code-extension-007ACC)
![Language](https://img.shields.io/badge/built%20with-JavaScript-F7DF1E)

Plain `TODO` comments get lost as a project grows. **Tagged TODOs** adds one small convention, a tag between brackets, and turns your scattered comments into an organized tree you can browse and jump through.

<!-- Screenshot: save it as images/demo.png and remove these comment marks
![Tagged TODOs in action](images/demo.png)
-->

## Installation

- **From VS Code:** open the Extensions view (`Ctrl+Shift+X`), search for **Tagged TODOs** and click **Install**.
- **From the Quick Open bar** (`Ctrl+P`): paste `ext install pablojimp.tagged-todos` and press Enter.
- **From the web:** [Tagged TODOs on the Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=pablojimp.tagged-todos).

Requires VS Code 1.74 or later.

## How it works

Add a tag between brackets to your TODO comments, in any file and any language:

```js
// auth.js
// TODO[backend]: validate the token on login

// users.js
// TODO[backend]: add pagination
```

```css
/* styles.css */
/* TODO[ui]: center the save button */
```

Open the **Tagged TODOs** icon in the Activity Bar and you get them grouped by tag, with the file and line of each one:

```
TODOs by Tag
├─ BACKEND (2)
│   ├─ validate the token on login      auth.js:2
│   └─ add pagination                   users.js:2
└─ UI (1)
    └─ center the save button */        styles.css:2
```

Click any TODO to open its file at that line. Hover over it to see the full path. The tree updates every time you save a file.

## Features

- Dedicated view in the Activity Bar
- TODOs grouped by tag, with the number of TODOs in each group
- File name and line shown next to each TODO
- One click to open the file at the exact line
- Automatic refresh when you save a file
- Works with any comment style: `//`, `#`, `--`, `/* */`, `<!-- -->`…

## Comment format

| Comment | Result |
|---|---|
| `// TODO[backend]: fix login` | Tag `BACKEND`, text "fix login" |
| `# TODO[docs]: write README` | Tag `DOCS`, text "write README" |
| `// todo[Ui] center button` | Tag `UI`, text "center button" (case and `:` don't matter) |
| `// TODO fix login` | Grouped under `UNTAGGED` |
| `// TODO[api]` | Tag `API`, text "WITHOUT DESCRIPTION" |

Tags are always shown in uppercase, so `backend`, `Backend` and `BACKEND` end up in the same group.

## Known limitations

- **The whole workspace is scanned on every save.** In very large projects this can take a moment.
- **Excluded folders are fixed for now:** `node_modules`, `.git`, `target` and `out`. Choosing your own is planned (see below).
- **Only saving refreshes the tree.** If you create, delete or rename a file, the change shows up the next time you save any file.
- **`TODO` is detected anywhere in a line**, not only inside comments, so a string like `"TODO list"` also counts.
- **Only the first `TODO` of each line is read.**
- **Closing comment marks are part of the text**, so `/* TODO[ui]: fix */` shows up as `fix */`.

## Planned

- Settings to choose which file types to scan and which folders to ignore
- Highlight tagged TODOs inside the editor

Ideas and bug reports are welcome in the [issues](https://github.com/pablojimp/tagged-todos/issues).

## Release notes

See the [CHANGELOG](CHANGELOG.md).

## Development

Requirements: [Node.js](https://nodejs.org) (LTS) and [VS Code](https://code.visualstudio.com).

```bash
git clone https://github.com/pablojimp/tagged-todos.git
cd tagged-todos
npm install
```

Open the folder in VS Code and press **F5**. A new *Extension Development Host* window opens with the extension loaded. After changing the code, run **Developer: Reload Window** in that window to see the changes.

## Credits

Icons by [Uicons](https://www.flaticon.com/uicons) from [Flaticon](https://www.flaticon.com).

## License

[MIT](LICENSE) © Pablo Jimenez
