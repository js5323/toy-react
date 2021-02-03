
class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content)
  }
}


class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type);
  }
  setAttribute(attr, value) {
    this.root.setAttribute(attr, value)
  }
  appendChild(component) {
    this.root.appendChild(component.root)
  }
}

export class Component {
  constructor() {
    this.props = Object.create(null);
    this.children = [];
    this._root = null;
  }
  setAttribute(attr, value) {
    this.props[attr] = value;
  }
  appendChild(component) {
    this.children.push(component)
  }
  get root() {
    if (!this._root) {
      this._root = this.render().root;
    }

    return this._root;
  }
}


export function createElement(type, attributes, ...children) {
  let e;
  if (typeof type === 'string') {
    e = new ElementWrapper(type);
  } else {
    e = new type;
  }

  for (const p in attributes) {
    e.setAttribute(p, attributes[p]);
  }


  const insertChildren = (children) => {
    for (let child of children) {
      if (typeof child === "string") {
        child = new TextWrapper(child);
      }

      if (Array.isArray(child)) {
        insertChildren(child)
      } else {
        e.appendChild(child);
      }
    }
  }

  insertChildren(children);

  return e;
}


export const render = (component, parentNode) => {
  parentNode.appendChild(component.root);
}