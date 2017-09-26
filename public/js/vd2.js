var Album = React.createClass({
  getNextImage: function () {
    this.setState({hinh: this.state.hinh == 5? 5 : this.state.hinh + 1});
  },
  getPreviewsImage: function () {
    this.setState({hinh: this.state.hinh == 1? 1 : this.state.hinh - 1});
  },
  getInitialState() {
    return {hinh: 1};
  },
  render: function () {
    return(
      <div>
        <img src={"album/bird0" + this.state.hinh + ".jpg"} className="image"/>
        <hr/>
        <button className="button" onClick={this.getNextImage}>Next</button>
        <button className="button" onClick={this.getPreviewsImage}>Previews</button>
      </div>
    );
  },
});
ReactDOM.render(
  <div>
    <Album />
  </div>
  , document.getElementById("root")
);
