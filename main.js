


import { createElement, render, Component } from "./toy-react"




class MyComponent extends Component {
  render() {
    return <div>
      <h1>Toy React</h1>
      {this.children}
    </div>
  }
}


render(<MyComponent>
  <p>hello world!!</p>
  <p>hello world!!</p>
  <p>hello world!!</p>
</MyComponent>, document.body)

