import React, { Component } from 'react';
import moment from 'moment';
import { Formik, Form, Field } from 'formik';
import TaskDataService from '../../api/dashboard/TaskDataService.js';
import AuthenticationService from '../../api/dashboard/AuthenticationService.js';
import { FormattedMessage } from 'react-intl';

class TaskComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      description: '',
      targetDate: moment(new Date()).format('YYYY-MM-DD'),
      employee: '',
      done: false,
      error: [
        {
          description: false,
          employee: false,
          targetDate: false
        }
      ]
    };
  }

  componentDidMount() {
    if (this.state.id === -1) {
      return;
    }
    let username = AuthenticationService.getUsername();
    TaskDataService.retrieveTask(username, this.state.id).then(response =>
      this.setState({
        description: response.data.description,
        targetDate: moment(response.data.targetDate).format('YYYY-MM-DD'),
        employee: response.data.employee,
        done: response.data.done
      })
    );
  }

  onSubmit = values => {
    let username = AuthenticationService.getUsername();
    let task = {
      id: this.state.id,
      description: values.description,
      targetDate: values.targetDate,
      employee: values.employee,
      done: values.done
    };

    if (this.state.id === -1) {
      TaskDataService.createTask(username, task).then(() =>
        this.props.history.push(`/tasks`)
      );
    } else {
      if((this.state.error.targetDate || this.state.error.employee || this.state.error.description)===false){
        TaskDataService.updateTask(username, this.state.id, task).then(() =>
          this.props.history.push(`/tasks`)
        )
      }
    }
  };
  validate = values => {
    if (!values.description) {
      this.setState(prevState => ({
      error: { ...prevState.error, description: true }
      }));
    } else {
      this.setState(prevState => ({
        error: { ...prevState.error, description: false }
        }));
    }

    if (!values.employee) {
      this.setState(prevState => ({
      error: { ...prevState.error, employee: true }
      }));  
    } else {
      this.setState(prevState => ({
        error: { ...prevState.error, employee: false }
        }));
    }

    if (!moment(values.targetDate).isValid()) {
      this.setState(prevState => ({
        error: { ...prevState.error, targetDate: true }
      }));
    } else {
      this.setState(prevState => ({
        error: { ...prevState.error, targetDate: false }
        }));
    }
  };
  render() {
    let { description, targetDate, employee, done } = this.state;
    return (
      <div>
        <h1>
          <FormattedMessage id="app.tasks.header" />
        </h1>
        <div className="container">
          <Formik
            initialValues={{ description, targetDate, employee, done }}
            onSubmit={this.onSubmit}
            validate={this.validate}
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
          >
            {props => (
              <Form>
                {this.state.error.description && (
                  <FormattedMessage id="app.tasks.description.error">
                    {message => (
                      <h4 className="alert alert-warning">{message}</h4>
                    )}
                  </FormattedMessage>
                )}
                {this.state.error.employee && (
                  <FormattedMessage id="app.tasks.employee.error">
                    {message => (
                      <h4 className="alert alert-warning">{message}</h4>
                    )}
                  </FormattedMessage>
                )}
                {this.state.error.targetDate && (
                  <FormattedMessage id="app.tasks.targetDate.error">
                    {message => (
                      <h4 className="alert alert-warning">{message}</h4>
                    )}
                  </FormattedMessage>
                )}
                <fieldset className="form-group">
                  <label>
                    <FormattedMessage id="app.tasks.description" />
                  </label>
                  <Field
                    className="form-control"
                    type="text"
                    name="description"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>
                    <FormattedMessage id="app.tasks.employee" />
                  </label>
                  <Field className="form-control" type="text" name="employee" />
                </fieldset>
                <fieldset className="form-group">
                  <label>
                    <FormattedMessage id="app.tasks.date" />
                  </label>
                  <Field
                    className="form-control"
                    type="date"
                    name="targetDate"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>
                    <FormattedMessage id="app.tasks.checkbox" />
                  </label>
                  <Field
                    className="form-control"
                    type="checkbox"
                    name="done"
                    checked={props.values.done}
                  />
                </fieldset>
                <button type="submit" className="btn btn-success">
                  <FormattedMessage id="app.tasks.button" />
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default TaskComponent;
