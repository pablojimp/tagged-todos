const vscode = require('vscode');
const path = require('path');

class MapTree {
  /**
   * @param {Map<string, {
   *   TODO: { tag: string, text: string },
   *   FILE: vscode.Uri,
   *   LINE: number
   * }[]>} todosByTag
   */

  constructor(todosByTag) {
    this.todosByTag = todosByTag
    /** @type {vscode.EventEmitter<void>} */
    this.changeEmitter = new vscode.EventEmitter()
    this.onDidChangeTreeData = this.changeEmitter.event
  }


  /**
   * @param {*} element 
   */

  getTreeItem(element) {
    let treeItem
    if (typeof element === "string") {
      treeItem = new vscode.TreeItem(element, vscode.TreeItemCollapsibleState.Collapsed)
      const count = (this.todosByTag.get(element) ?? []).length
      treeItem.description = `(${count})`
    } else {
      treeItem = new vscode.TreeItem(element.TODO.text, vscode.TreeItemCollapsibleState.None)
      const lineNumber = element.LINE + 1
      treeItem.description = `${path.basename(element.FILE.fsPath)}:${lineNumber}`
      treeItem.tooltip = `${vscode.workspace.asRelativePath(element.FILE)}:${lineNumber}`
      treeItem.command = {
        title: "Open TODO",
        command: "vscode.open",
        arguments: [element.FILE, { selection: new vscode.Range(element.LINE, 0, element.LINE, 0) }]
      }
    }

    return treeItem
  }
  /**
   * @param {Map<string, {
   *   TODO: { tag: string, text: string },
   *   FILE: vscode.Uri,
   *   LINE: number
   * }[]>} newTodosByTag
   */
  refresh(newTodosByTag) {
    this.todosByTag = newTodosByTag
    this.changeEmitter.fire()
  }
  /**
   * @param {*} element 
   */

  getChildren(element) {
    let children = []
    if (element === undefined) {
      for (const tag of this.todosByTag.keys()) {
        children.push(tag)
      }
    } else {
      children = this.todosByTag.get(element) ?? []
    }
    return children
  }


}
module.exports = {
  MapTree
}


