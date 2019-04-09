import React, { Component } from 'react';
import image from './pictures/img.jpg';

class App extends Component {
  state = {
    val: 0
  }

  onInputChange = (e) => {
    const newVal = e.target.value;
    console.log(newVal);
    this.setState({
        val: newVal
    });
  }

  createTable = (num) => {
    let table = []

    for (let i = 0; i < num; i++){
      table.push(
        <tr>
          <img src={ image }/>
        </tr>
      )
    }
    return table
  }

  render() {
    return (
      <div>
        <input
          placeholder="Enter Number"
          value = {this.state.val}
          onChange = {this.onInputChange}
        />
        <table>
          { this.createTable(this.state.val) }
        </table>
      </div>
    );
  }
}

export default App;
