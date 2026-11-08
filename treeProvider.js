const vscode = require('vscode');

class MapTree {
  /**
   * @param {Map<string, {
   *   TODO: { tag: string, text: string },
   *   FILE: vscode.Uri,
   *   LINE: number
   * }[]>} mapa
   */

  constructor(mapa) {
    this.mapa = mapa
    /** @type {vscode.EventEmitter<void>} */
    this.emisor = new vscode.EventEmitter()
    this.onDidChangeTreeData = this.emisor.event
  }


  /**
   * @param {*} element 
   */

  getTreeItem(element) {
    let treeItem
    if (typeof element === "string") {
      treeItem = new vscode.TreeItem(element, vscode.TreeItemCollapsibleState.Collapsed)
    } else {
      treeItem = new vscode.TreeItem(element.TODO.text, vscode.TreeItemCollapsibleState.None)
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
   * }[]>} mapaNuevo
   * 
   */
  refrescar(mapaNuevo) {
    this.mapa = mapaNuevo
    this.emisor.fire()
  }
  /**
   * @param {*} element 
   */

  getChildren(element) {
    let clavesDevolver = []
    if (element === undefined) {
      for (const tag of this.mapa.keys()) {
        clavesDevolver.push(tag)
      }
    } else {
      clavesDevolver = this.mapa.get(element) ?? []
    }
    return clavesDevolver
  }


}
module.exports = {
  MapTree
}


