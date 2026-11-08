const vscode = require('vscode');
const { textAnalyzer } = require('./parser')
const { MapTree } = require('./treeProvider')

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	let currentTodos = await loadTodos()
	let todosByTag = groupByTag(currentTodos)
	const todoTree = new MapTree(todosByTag)
	const treeDisposable = vscode.window.registerTreeDataProvider("todo-tags.list", todoTree)

	const saveListener = vscode.workspace.onDidSaveTextDocument(async () => {
		currentTodos = await loadTodos()
		todosByTag = groupByTag(currentTodos)
		todoTree.refresh(todosByTag)
	})
	context.subscriptions.push(treeDisposable, saveListener);
}
async function loadTodos() {
	const files = await loadWorkspace()
	let TODOTAGS = []

	for (const file of files) {
		try {
			const document = await vscode.workspace.openTextDocument(file)
			for (let i = 0; i <= document.lineCount - 1; i++) {
				let parsedLine = textAnalyzer(document.lineAt(i).text)
				if (parsedLine != null) {
					TODOTAGS.push({
						"TODO": parsedLine
						, "FILE": file,
						"LINE": i
					})
				}
			}
		} catch (error) {
			console.warn(`Could not read ${file.fsPath}: ${error}`)
		}
	}
	return TODOTAGS
}

/**
 * @param {{
 *   TODO: { tag: string, text: string },
 *   FILE: vscode.Uri,
 *   LINE: number
 * }[]} todos
 */
function groupByTag(todos) {

	const groups = new Map();
	for (let i = 0; i < todos.length; i++) {
		if (groups.get(todos[i].TODO.tag)) {

			groups.get(todos[i].TODO.tag).push(todos[i])
		}
		else {
			let newGroup = []
			newGroup.push(todos[i])
			groups.set(todos[i].TODO.tag, newGroup)
		}
	}
	return groups
}

async function loadWorkspace() {
	return await vscode.workspace.findFiles('**/*', '**/{node_modules,.git,target,out}/**');
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
