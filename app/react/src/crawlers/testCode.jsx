import React from 'react'
import ReactDom from 'react-dom'

const buttonStyle = {
  display: "inline-block",
  padding: "15px 25px",
  "font-size": "12px",
  cursor: "pointer",
  "text-align": "center",
  "text-decoration": "none",
  outline: "none",
  color: "#fff",
  "background-color": "#0ca3d2",
  border: "none",
  "border-radius": "15px"
};

class TestCrawlers extends React.Component {
  constructor() {
    super()
    this.state = {result: ""}
  }
 
  render() {
    return (
      <div>
        <div>
          <input type="text" onChange={(e) => {this.state.url = e.target.value;}}></input>
        </div>
        
        <div>
          <textarea rows="20" cols="50" onChange={(e) => this.state.code = e.target.value}></textarea>
          <textarea rows="20" cols="50" value={this.state.result}></textarea>
        </div>
        
        <button style={buttonStyle} onClick={() => {
            const ref = this;
            $.ajax({
            url: '/crawlers',
            method: 'post',
            data: this.state,
            success: function(data) {
                var state = ref.state;
                state.result = data;
                ref.setState(state);
            }
        })}
      }>Test code</button>
      <br/>
      </div>
    );
  }
}

const app = document.getElementById("app");
ReactDom.render(<TestCrawlers />, app);
