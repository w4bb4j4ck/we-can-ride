import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'whitesmoke',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '30px',
    marginTop: '30px'
  },
  textField: {
    margin: theme.spacing(1),
    width: '48%',
  },
  title: {
    textAlign: 'center',
    width: '100%',
    textDecoration: 'underline',
    margin: 0,
    padding: 0,
  },
  formContent: {
    width: '100%',
    textAlign: 'center',
  },
  button: {
    margin: theme.spacing(1),
    marginBottom: 30
  },
  tableTitle: {
    textAlign: 'center',
    textDecoration: 'underline',
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  columnTitle: {
    textAlign: 'center',
  },
  table: {
    backgroundColor: 'whitesmoke',
    width: '83%',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});

class EditVolunteer extends Component {

  // initial state for the form fields
  state = {
    first_name: null,
    last_name: null,
    phone: null,
    email: null,
    birthday: null,
    id: null,
    amSunday: null,
    pmSunday: null,
    amMonday: null,
    pmMonday: null,
    amTuesday: null,
    pmTuesday: null,
    amWednesday: null,
    pmWednesday: null,
    amThursday: null,
    pmThursday: null,
    amFriday: null,
    pmFriday: null,
    amSaturday: null,
    pmSaturday: null,
    sidewalker: null,
    leader: null,
    barn_aid: null,
    feeder: null,
    notification: null,
    type_of_user: null,
  }

  // detects a change on an input field and updates the state accordingly
  handleChange = ( event, propName ) => {
    this.setState({
      ...this.state,
      [ propName ]: event.target.value,
    })
  };

  handleCheckboxChangeFor = propertyName => ( event ) => {
    this.setState({
      [propertyName]: event.target.checked,
    });
  }
  componentDidMount(){
    this.props.dispatch( { type: 'FETCH_SELECTED_VOLUNTEER', payload: this.props.match.params.id } );
  }
  componentDidUpdate(prevProps, prevState){
    //if we just got a volunteer from the database
    if (prevProps.state.volunteer.selectedVolunteer !== this.props.state.volunteer.selectedVolunteer){
      //set the state to match the volunteer
      let type_of_user;
      let newState = {};
      //if the volunteer doesn't have availability, leave it alone, but if they do, set state with it
      if(this.props.state.volunteer.selectedVolunteer.availability[0]){
        for ( let userAvailability of this.props.state.volunteer.selectedVolunteer.availability ) {
          newState[userAvailability] = true;
        }
      }
      //if the volunteer doesn't have skills, leave the skills alone, but if they do, set state with them
      if(this.props.state.volunteer.selectedVolunteer.skill[0]){
        for ( let userSkill of this.props.state.volunteer.selectedVolunteer.skill ) {
          newState[userSkill] = true;
        }      
      }
      if( this.props.state.volunteer.selectedVolunteer.type_of_user === 'admin' ) {
        type_of_user = true;
      }
      else {
        type_of_user = false;
      }
      this.setState({
        ...this.state,
        first_name: this.props.state.volunteer.selectedVolunteer.first_name,
        last_name: this.props.state.volunteer.selectedVolunteer.last_name,
        phone: this.props.state.volunteer.selectedVolunteer.phone,
        email: this.props.state.volunteer.selectedVolunteer.email,
        birthday: moment(this.props.state.volunteer.selectedVolunteer.birthday).format('yyyy-MM-DD'),
        id: this.props.state.volunteer.selectedVolunteer.id,
        notification: this.props.state.volunteer.selectedVolunteer.notification,
        type_of_user,
        ...newState,
      })
    }
  }
  
  handleClick = () => {
    this.props.dispatch( { type: 'UPDATE_SELECTED_VOLUNTEER', payload: this.state } );
    this.props.history.push( '/managevolunteers');
  
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <form className={classes.container}>
          <h2 className={classes.title}>Edit Volunteer Information</h2>
          <div className={classes.formContent}>
          <TextField
            label="First Name"
            className={classes.textField}
            value={this.state.first_name}
            onChange={ (event) => this.handleChange( event, 'first_name')}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Last Name"
            className={classes.textField}
            value={this.state.last_name}
            onChange={ (event) => this.handleChange( event, 'last_name')}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Phone Number"
            className={classes.textField}
            value={this.state.phone}
            onChange={ (event) => this.handleChange( event, 'phone')}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Email"
            className={classes.textField}
            value={this.state.email}
            onChange={ (event) => this.handleChange( event, 'email')}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Password"
            className={classes.textField}
            value="*******"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Birthday"
            type="date"
            className={classes.textField}
            value={this.state.birthday}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={ (event) => this.handleChange( event, 'birthday')}
          />
          Notifications
          <Checkbox
            checked={this.state.notification}
            onChange={this.handleCheckboxChangeFor('notification')}
            value="notification"
          />
          Admin
          <Checkbox
            checked={this.state.type_of_user}
            onChange={this.handleCheckboxChangeFor('type_of_user')}
            value="admin"
          />
          </div>
          </form>
          {/* TABLE BELOW */}
          
          <Table  className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableTitle} colSpan={7}>
                    Edit Role
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  <TableRow>
                    <TableCell>
                    Sidewalker
                        <Checkbox
                          checked={this.state.sidewalker}
                          onChange={this.handleCheckboxChangeFor( 'sidewalker')}
                          value="sidewalker"
                        />
                      
                    </TableCell>
                    <TableCell>
                    Leader
                        <Checkbox
                          checked={this.state.leader}
                          onChange={this.handleCheckboxChangeFor('leader')}
                          value="leader"
                        />
                      
                    </TableCell>
                    <TableCell>
                    Barn aid
                        <Checkbox
                          checked={this.state.barn_aid}
                          onChange={this.handleCheckboxChangeFor('barn_aid')}
                          value="barn_aid"
                        />
                      
                    </TableCell>
                    <TableCell>
                    Feeder
                        <Checkbox
                          checked={this.state.feeder}
                          onChange={this.handleCheckboxChangeFor('feeder')}
                          value="feeder"
                        />
                      
                    </TableCell>
                  </TableRow>
              </TableBody>
            </Table>
            <Table  className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableTitle} colSpan={7}>
                    Edit Availability
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell  className={classes.columnTitle}>Sunday</TableCell>
                  <TableCell  className={classes.columnTitle}>Monday</TableCell>
                  <TableCell  className={classes.columnTitle}>Tuesday</TableCell>
                  <TableCell  className={classes.columnTitle}>Wednesday</TableCell>
                  <TableCell  className={classes.columnTitle}>Thursday</TableCell>
                  <TableCell  className={classes.columnTitle}>Friday</TableCell>
                  <TableCell  className={classes.columnTitle}>Saturday</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  <TableRow>
                    <TableCell>
                      AM
                        <Checkbox
                          checked={this.state.amSunday}
                          onChange={this.handleCheckboxChangeFor( 'amSunday')}
                          value="amSunday"
                        />
                      PM
                        <Checkbox
                          checked={this.state.pmSunday}
                          onChange={this.handleCheckboxChangeFor('pmSunday')}
                          value="pmSunday"
                        />
                    </TableCell>
                    <TableCell>
                      AM
                        <Checkbox
                          checked={this.state.amMonday}
                          onChange={this.handleCheckboxChangeFor('amMonday')}
                          value="amMonday"
                        />
                      PM
                        <Checkbox
                          checked={this.state.pmMonday}
                          onChange={this.handleCheckboxChangeFor('pmMonday')}
                          value="pmMonday"
                        />
                    </TableCell>
                    <TableCell>
                      AM
                        <Checkbox
                          checked={this.state.amTuesday}
                          onChange={this.handleCheckboxChangeFor('amTuesday')}
                          value="amTuesday"
                        />
                      PM
                        <Checkbox
                          checked={this.state.pmTuesday}
                          onChange={this.handleCheckboxChangeFor('pmTuesday')}
                          value="pmTuesday"
                        />
                    </TableCell>
                    <TableCell>
                      AM
                        <Checkbox
                          checked={this.state.amWednesday}
                          onChange={this.handleCheckboxChangeFor('amWednesday')}
                          value="amWednesday"
                        />
                      PM
                        <Checkbox
                          checked={this.state.pmWednesday}
                          onChange={this.handleCheckboxChangeFor('pmWednesday')}
                          value="pmWednesday"
                        />
                    </TableCell>
                    <TableCell>
                      AM
                        <Checkbox
                          checked={this.state.amThursday}
                          onChange={this.handleCheckboxChangeFor('amThursday')}
                          value="amThursday"
                        />
                      PM
                        <Checkbox
                          checked={this.state.pmThursday}
                          onChange={this.handleCheckboxChangeFor('pmThursday')}
                          value="pmThursday"
                        />
                    </TableCell>
                    <TableCell>
                      AM
                        <Checkbox
                          checked={this.state.amFriday}
                          onChange={this.handleCheckboxChangeFor('amFriday')}
                          value="amFriday"
                        />
                      PM
                        <Checkbox
                          checked={this.state.pmFriday}
                          onChange={this.handleCheckboxChangeFor('pmFriday')}
                          value="pmFriday"
                        />
                    </TableCell>
                    <TableCell>
                      AM
                        <Checkbox
                          checked={this.state.amSaturday}
                          onChange={this.handleCheckboxChangeFor('amSaturday')}
                          value="amSaturday"
                        />
                      PM
                        <Checkbox
                          checked={this.state.pmSaturday}
                          onChange={this.handleCheckboxChangeFor('pmSaturday')}
                          value="pmSaturday"
                        />
                    </TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          {/* TABLE ABOVE */}
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.handleClick}
          >
            UPDATE
          </Button>
      </>
    )
  }
}


const mapStateToProps = state => ({
    state,
  });

export default connect(mapStateToProps)(withStyles(styles)(EditVolunteer));