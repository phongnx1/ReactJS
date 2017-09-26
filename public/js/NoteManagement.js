var list;
var Note = React.createClass({
  getInitialState: function () {
    return{onEdit: false};
  },
  edit: function () {
    this.setState({onEdit: true});
  },
  save: function () {
    var note = this;
    $.post("/update", {noteId: this.props.id, noteContent: this.refs.txt.value}, function (data) {
      list.setState({arrNote: data});
      note.setState({onEdit: false});
    });
  },
  cancle: function () {
    this.setState({onEdit: false});
  },
  delete: function () {
    $.post("/delete", {noteId: this.props.id}, function (data) {
      list.setState({arrNote: data});
    });
  },
  render: function () {
    if(this.state.onEdit){
      return(
        <div className="div-note">
          <textarea defaultValue={this.props.children} className="form-control mb5px" ref="txt"></textarea>
          <button onClick={this.save} className="btn btn-success">Save</button>
          <button onClick={this.cancle} className="btn btn-default">Cancle</button>
        </div>
      );
    } else {
      return(
        <div className="div-note">
          <p>{this.props.children}</p>
          <button onClick={this.delete} className="btn btn-danger">Delete</button>
          <button onClick={this.edit} className="btn btn-primary">Edit</button>
        </div>
      );
    }
  },
});

function addDiv() {
  ReactDOM.render(
    <InputDiv/>
    , document.getElementById('div-add')
  )
}

var List = React.createClass({
  getInitialState: function () {
    list=this;
    return{arrNote: []};
  },
  render: function () {
    return(
      <div className="div-list">
        {
          this.state.arrNote.map(function(note, index){
              return <Note key={index} id={index}>{note}</Note>
            })
          }
          <div id="div-add"></div>
          <button type="button" onClick={addDiv} className="btn btn-secondary">Add Note</button>
      </div>
    );
  },
  componentDidMount: function () {
    var listNote = this;
    $.post("/getNote", function (data) {
      list.setState({arrNote: data})
    });
  }
});

var InputDiv = React.createClass({
  send: function () {
    $.post("/add", {note: this.refs.txt.value}, function(data) {
      list.setState({arrNote: data});
    })
    ReactDOM.unmountComponentAtNode(document.getElementById('div-add'));
  },
  render: function () {
    return(
      <div>
        <textarea className="form-control mb5px" ref="txt"></textarea>
        <button type="button" onClick={this.send} className="btn btn-info">Send</button>
      </div>
    );
  },
});
ReactDOM.render(
  <div>
    <List/>
  </div>
  , document.getElementById("root")
);
