import React, { Component } from 'react';
import TaskDataService from '../../api/dashboard/TaskDataService.js';
import AuthenticationService from '../../api/dashboard/AuthenticationService.js';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

class ListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      message: null
    };
    this.deleteTaskOnClicked = this.deleteTaskOnClicked.bind(this);
    this.updateTaskOnClicked = this.updateTaskOnClicked.bind(this);
    this.refreshTasks = this.refreshTasks.bind(this);
    this.addTaskClicked = this.addTaskClicked.bind(this);
  }

  componentDidMount() {
    this.refreshTasks();
  }

  refreshTasks() {
    let username = AuthenticationService.getUsername();
    TaskDataService.retrieveAllTasks(username).then(response => {
      this.setState({ tasks: response.data });
    });
  }
  deleteTaskOnClicked(id) {
    let username = AuthenticationService.getUsername();
    TaskDataService.deleteTask(username, id).then(response => {
      this.setState({ message: `Successfully deleted task ${id}` });
      this.refreshTasks();
    });
  }

  updateTaskOnClicked(id) {
    this.props.history.push(`/tasks/${id}`);
  }

  addTaskClicked() {
    this.props.history.push(`/tasks/-1`);
  }

  render() {
    return (
      <div>
        <h1>
          <FormattedMessage id="app.tasks.header" />
        </h1>
        {this.state.message && (
          <div className="alert alert-success">{this.state.message}</div>
        )}
        <div className="container">
          <div className="row">
            <button
              className="btn btn-success"
              onClick={() => this.addTaskClicked()}
            >
              <FormattedMessage id="app.tasks.add" />
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>
                  <FormattedMessage id="app.tasks.description" />
                </th>
                <th>
                  <FormattedMessage id="app.tasks.done" />
                </th>
                <th>
                  <FormattedMessage id="app.tasks.date" />
                </th>
                <th>
                  <FormattedMessage id="app.tasks.employee" />
                </th>
                <th>
                  <FormattedMessage id="app.tasks.update" />
                </th>
                <th>
                  <FormattedMessage id="app.tasks.delete" />
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.tasks.map(task => (
                <tr key={task.id}>
                  <td>{task.description}</td>
                  <td>{task.done.toString()}</td>
                  <td>{moment(task.targetDate).format('YYYY-MM-DD')}</td>
                  <td>{task.employee}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => this.updateTaskOnClicked(task.id)}
                    >
                      <FormattedMessage id="app.tasks.update" />
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => this.deleteTaskOnClicked(task.id)}
                    >
                      <FormattedMessage id="app.tasks.delete" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListComponent;
