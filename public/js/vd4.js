var Note = React.createClass({
  render: function () {
    return(
      <div>
        <img src={this.props.src} className="image"/>
        <p>{this.props.children}</p>
      </div>
    );
  },
});

var List = React.createClass({
  add: function () {
    this.state.mang.push("NodeJS", "ReactJS");
    this.setState(this.state);
  },
  getInitialState: function () {
    return{mang: [
      {srcHinh: "album/bird01.jpg", noiDung: "Hello"},
      {srcHinh: "album/bird02.jpg", noiDung: "Hi"},
      {srcHinh: "album/bird03.jpg", noiDung: "Khoa Pham"}
    ]};
  },
  render: function () {
    return(
      <div>
      <button onClick={this.add}>Them</button>
        {
          this.state.mang.map(function(note, index){
              return <Note key={index} src={note.srcHinh}>{note.noiDung}</Note>
          })
        }
      </div>
    );
  }
});
ReactDOM.render(
  <div>
    <List/>
  </div>
  , document.getElementById("root")
);
