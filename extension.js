// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { textAnalyzer } = require('./parser')
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "tagged-todos" is now active!');
	const currentTodos = await loadTodos()
	console.log(currentTodos)
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('tagged-todos.helloWorld', function () {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Tagged TODOs!');
	});

	context.subscriptions.push(disposable);
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

async function loadWorkspace() {
	return await vscode.workspace.findFiles('**/*', '**/{node_modules,.git,target,out}/**');
}
// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
