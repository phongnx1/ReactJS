var Com = React.createClass({
  increase: function () {
    this.state.num = parseInt(this.state.num) + 1;
    this.setState(this.state);
  },
  getInitialState: function () {
    return {num: 0};
  },
  render: function(){
    return(
      <button className="button" onClick={this.increase}>Hello  {this.state.num}</button>
    );
  },
});
ReactDOM.render(
  <div>
    <Com />
  </div>
  , document.getElementById("root")
);
