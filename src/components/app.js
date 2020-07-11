import React, { Component } from 'react';
import axios from 'axios';

import { filterJobByDate } from '../utils/filterJobs';
import TaskLayout from './TaskLayout';
import TaskModal from './TaskModal';
import Header from './Header';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          jobDetails: [],
          employees: [],
          showModal: false,
          itemsToBeShownInModal: {},
          selectedIndex: {
            row: -1,
            column: -1
          },
          taskInfoFromModal: [{
            rowIndex: -1,
            columnIndex: -1,
            task: null
          }]
        }
    }

    componentDidMount() {
      const getJobDetails = axios.get('../data/getWorkOrderList.json');
      const getEmployees = axios.get('../data/getEmployeeList.json');
      axios.all([getJobDetails, getEmployees])
        .then(axios.spread((...responses) => {
          const jobDetails = filterJobByDate(responses[0].data);
          const employees = responses[1].data.employees || [];
          this.setState({
            jobDetails,
            employees
          });
        })).catch(errors => {
          console.warn(errors);
      })
    }

    handleClick(column, row) {
      const { jobDetails = {} } = this.state;
      const selectedKey = Object.keys(jobDetails)[column];
      const itemsToBeShownInModal = { list: jobDetails[selectedKey], date: selectedKey};
      console.log('itemsToShowInModal', itemsToBeShownInModal);
      this.setState({
        showModal: true,
        itemsToBeShownInModal: {...itemsToBeShownInModal},
        selectedIndex: {
          row,
          column
        },
      });
    }

    getGridContent(row, column) {
      const { taskInfoFromModal } = this.state;
      for (let i = 0; i < taskInfoFromModal.length; i++) {
        const taskInfo = taskInfoFromModal[i];
        if (taskInfo.rowIndex === row && taskInfo.columnIndex === column) {
          return (
            <TaskLayout name={taskInfo.task.name} jobname={taskInfo.task.jobname}  />
          )
        }
      }
      return '';
    }

    renderTableContent() {
      const { employees } = this.state;
      let content = '';
      return employees.map((employee, row) => {
        const { Name } = employee;
        return (
          <tr key={row}>
            <td className="empName">{Name}</td>
            {[0, 1, 2, 3, 4].map((column) => {
              content = this.getGridContent(row, column);
              return (
                <td key={`${column}-$-${row}`} onClick={() => this.handleClick(column, row)}>
                  <div className="task-grid">{content}</div>
                </td>
              );
            })}
          </tr>
        );
      });
    }

    renderHeader() {
      const header = Object.keys(this.state.jobDetails);
      return header.map((key, index) => {
         return <th key={index}>{`${key}-Apr-20`}</th>
      })
    }

    handleItemClickOnModal = (name, jobname, date, index) => {
      const { jobDetails = {} } = this.state;
      const res= [];
      for (let i = 0; i < jobDetails[date].length; i++) {
        if (index !== i) {
          res.push(jobDetails[date][i])
        } 
      }
      const { row, column } = this.state.selectedIndex;
      this.setState({
        taskInfoFromModal: [...this.state.taskInfoFromModal, { rowIndex: row, columnIndex: column, task: { name, jobname } }],
        showModal: false,
        jobDetails: {...jobDetails, [date]: res}
      });
    }

    renderTaskGrid() {
      const { jobDetails = {} } = this.state;
      const results = [];
      Object.keys(jobDetails).forEach((key) => {
        results.push(
          <td className="task-column" key={key}>
            {jobDetails[key].map(({jobname, name}) => <TaskLayout name={name} jobname={jobname} key={name} />)}
          </td>
        );
      });

      return (
        <tr className="task-row">
          <td className="task-column"></td>
          {results}
        </tr>
      )
    }

    render() {
      const { jobDetails, itemsToBeShownInModal, showModal } = this.state;
      if (!Object.keys(jobDetails).length) {
        return <div> Loading......... </div>;
      }
      return (
        <div className="container">
          <table id='workorder'>
            <tbody>
              <tr>
                <th className="borderBottom"></th>
                <Header jobDetails={this.state.jobDetails}/>
              </tr>
              {this.renderTableContent()}
              {this.renderTaskGrid()}
            </tbody>
          </table>
          { showModal ? <TaskModal items={itemsToBeShownInModal} handleItemClickOnModal={this.handleItemClickOnModal} /> : null}
        </div>
      )
    }
}

export default App;
