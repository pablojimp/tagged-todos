// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { textAnalyzer } = require('./parser')
const { MapTree } = require('./treeProvider')
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "tagged-todos" is now active!');
	let currentTodos = await loadTodos()
	let vistaArbol = mapaArbol(currentTodos)
	let arbol = new MapTree(vistaArbol)
	let arbolDisposable = vscode.window.registerTreeDataProvider("todo-tags.list", arbol)

	const escucha = vscode.workspace.onDidSaveTextDocument(async (documento) => {
		currentTodos = await loadTodos()
		vistaArbol = mapaArbol(currentTodos)
		arbol.refrescar(vistaArbol)
	})
	context.subscriptions.push(arbolDisposable, escucha);
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
 * }[]} lista
 */
function mapaArbol(lista) {

	const mapaDevolver = new Map();
	for (let i = 0; i < lista.length; i++) {
		if (mapaDevolver.get(lista[i].TODO.tag)) {

			mapaDevolver.get(lista[i].TODO.tag).push(lista[i])
		}
		else {
			let arrayGuardar = []
			arrayGuardar.push(lista[i])
			mapaDevolver.set(lista[i].TODO.tag, arrayGuardar)
		}
	}
	return mapaDevolver
}

async function loadWorkspace() {
	return await vscode.workspace.findFiles('**/*', '**/{node_modules,.git,target,out}/**');
}
// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
