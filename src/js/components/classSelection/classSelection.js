var React = require('react');
var LoginStore = require('./../../stores/LoginStore');
var RethinkApiUtils = require('../../utils/app-rethinkDataApiUtils');
var LoginActions = require('../../actions/LoginAction');
var ReactBootstrap = require('react-bootstrap'),
  Modal = ReactBootstrap.Modal,
  Table = ReactBootstrap.Table,
  Button = ReactBootstrap.Button;

var ClassSelection = React.createClass({

  _onButtonClick: function( event ) {
    RethinkApiUtils.loadUsersInClass( event.target.id );
    LoginActions.selectClass( event.target.id );
  },

  render:function(){
    var teacher = LoginStore.getTeacher();
    var availableClasses = LoginStore.getAvailableClasses();
    var classes = [];
    if( availableClasses != null ) {
        classes = availableClasses.map( function ( thisClass , i ) {
          return (
            <tr key={i} >
              <td>{thisClass.className}</td>
              <td>{thisClass.classCode}</td>
              <td><Button bsStyle="primary" id={thisClass.id} onClick={this._onButtonClick}>Select Class</Button></td>
            </tr>
          );
        }, this);
    }
    return (
        <Modal show={this.props.showClassSelection} >
            <Modal.Header>
              <Modal.Title>Class Selection</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Class Name</th>
                    <th>Class Code</th>
                    <th>Selection</th>
                  </tr>
                </thead>
                <tbody>
                  {classes}
                 </tbody>
              </Table>
            </Modal.Body>
        </Modal>
      );
  }
});

module.exports = ClassSelection