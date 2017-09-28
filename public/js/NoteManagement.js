var socket = io();
var list;
var note;

function addDiv() {
  ReactDOM.render(
    <InputDiv/>
    , document.getElementById('div-add')
  )
}

var Note = React.createClass({
  getInitialState: function () {
    return{onEdit: false};
  },
  edit: function () {
    this.setState({onEdit: true});
  },
  save: function () {
    note = this;
    socket.emit('update_note', {noteId: this.props.id, noteContent: this.refs.txt.value});
  },
  cancle: function () {
    this.setState({onEdit: false});
  },
  delete: function () {
    socket.emit('delete_note', this.props.id);
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
          <button onClick={this.delete} className="btn btn-danger" data-toggle="confirmation">Delete</button>
          <button onClick={this.edit} className="btn btn-primary">Edit</button>
        </div>
      );
    }
  },
});

var List = React.createClass({
  getInitialState: function () {
    list=this;
    return{arrNote: []};
  },
  render: function () {
    return(
      <div className="div-list-category">
      <p className="note-list-category-title">NOTE MANAGEMENT</p>
      <div className="div-list">
        {
          this.state.arrNote.map(function(note, index){
            return <Note key={index} id={note.NOTE_ID}>{note.NOTE_CONTENT}</Note>
          })
        }
        <div id="div-add"></div>
      </div>
      <button type="button" onClick={addDiv} className="btn btn-secondary">Add Note</button>
      </div>
    );
  },
  componentDidMount: function () {
    $.post("/getNote", function (data) {
      list.setState({arrNote: data})
    });
  }
});

var InputDiv = React.createClass({
  send: function () {
    socket.emit('add_note', this.refs.txt.value);
    ReactDOM.unmountComponentAtNode(document.getElementById('div-add'));
  },
  cancleAdd: function () {
    ReactDOM.unmountComponentAtNode(document.getElementById('div-add'));
  },
  render: function () {
    return(
      <div>
        <textarea autoFocus className="form-control mb5px" ref="txt"></textarea>
        <button type="button" onClick={this.send} className="btn btn-info">Send</button>
        <button type="button" onClick={this.cancleAdd} className="btn btn-default">cancle</button>
      </div>
    );
  },
});

socket.on('add_note', function(data){
  list.setState({arrNote: data});
});

socket.on('delete_note', function(data){
  list.setState({arrNote: data});
});

socket.on('update_note', function(data){
  list.setState({arrNote: data});
  note.setState({onEdit: false});
});

ReactDOM.render(
  <div>
    <List/>
  </div>
  , document.getElementById("root")
);
