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
    this.mapa = mapa;
  }

  /**
   * @param {*} element 
   */

  getTreeItem(element) {
    if (typeof element === "string") {
      return new vscode.TreeItem(element,vscode.TreeItemCollapsibleState.Collapsed)
    } else {
      return new vscode.TreeItem(element.TODO.text, vscode.TreeItemCollapsibleState.None)
    }
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


