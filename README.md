# Tagged TODOs

> Write `TODO[tag]: text` in your code and see every TODO grouped by tag in its own sidebar view.

[![Marketplace](https://img.shields.io/visual-studio-marketplace/v/pablojimp.tagged-todos?label=Marketplace)](https://marketplace.visualstudio.com/items?itemName=pablojimp.tagged-todos)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/pablojimp.tagged-todos)](https://marketplace.visualstudio.com/items?itemName=pablojimp.tagged-todos)
![VS Code](https://img.shields.io/badge/VS%20Code-extension-007ACC)
![Language](https://img.shields.io/badge/built%20with-JavaScript-F7DF1E)

Plain `TODO` comments get lost as a project grows. **Tagged TODOs** adds one small convention, a tag between brackets, and turns your scattered comments into an organized tree you can browse and jump through.

## How it works

Write your comments with a tag inside the brackets:

```js
// TODO[backend]: validate the token on login
// TODO[ui]: center the save button
// TODO[backend]: add pagination
```

Open the **Tagged TODOs** tab in the Activity Bar and you get them grouped by tag:

```
TODOs by Tag
├─ BACKEND (2)
│   ├─ validate the token on login      AuthService.java:42
│   └─ add pagination                   UserController.java:18
└─ UI (1)
    └─ center the save button           styles.css:7
```

Click any item to jump straight to its line.

<!-- Add a screenshot or short GIF here once the tree view works:
![Tagged TODOs in action](images/demo.gif)
-->

## Features

- Dedicated view in the Activity Bar
- TODOs grouped by the text inside `[ ]`, with a counter per group
- One click to open the file at the exact line
- Automatic refresh when you save a file

## Comment format

| Comment | Result |
|---|---|
| `// TODO[backend]: fix login` | Tag `BACKEND`, text "fix login" |
| `# TODO[docs]: write README` | Tag `DOCS`, text "write README" |
| `// todo[Ui] center button` | Tag `UI`, text "center button" (case and `:` don't matter) |
| `// TODO fix login` | Grouped under `UNTAGGED` |
| `// TODO[api]` | Tag `API`, text "WITHOUT DESCRIPTION" |

Tags are always shown in uppercase, so `backend`, `Backend` and `BACKEND` end up in the same group.

## Roadmap

- [x] Project setup and first command running
- [x] Activity Bar container and view
- [x] Detect `TODO[tag]` comments (regex)
- [x] Scan the workspace files
- [x] Group by tag
- [x] Render the tree view
- [x] Click to jump to the line + auto refresh
- [ ] Settings: file types and folders to ignore
- [ ] Highlight tagged TODOs in the editor
- [x] Publish on the Marketplace

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

---

Made by Pablo. Feedback and ideas are welcome. Enjoy!