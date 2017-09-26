var Images = React.createClass({
  changeImage: function () {
    this.setState({hinh: (this.state.hinh % 5) + 1});
  },
  getInitialState() {
    return {hinh: 1};
  },
  render: function () {
    return(
      <div>
        <img src={"album/bird0" + this.state.hinh + ".jpg"} className="image"/>
      </div>
    );
  },
  componentDidMount () {
    setInterval(this.changeImage, 1000);
  }
});
ReactDOM.render(
    <Images />
  , document.getElementById("root")
);
