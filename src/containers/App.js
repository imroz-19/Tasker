import React, { Component } from 'react';
import axios from 'axios';

import { filterJobByDate } from '../utils/filterJobs';
import TaskLayout from '../components/TaskLayout';
import TaskModal from '../components/TaskModal';
import TableContent from '../components/TableContent';
import TaskGrid from '../components/TaskGrid';
import Header from '../components/Header';

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

    handleClick = (column, row) => {
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

    render() {
      const {
          jobDetails,
          itemsToBeShownInModal,
          showModal,
          taskInfoFromModal,
          employees
      } = this.state;

      if (!Object.keys(jobDetails).length) {
        return <div> Loading......... </div>;
      }
      return (
        <React.Fragment>
          <h1 className="heading-text">Workorder Assignment tool</h1>
          <div className="container">
            <table id='workorder'>
              <tbody>
                <tr>
                  <th className="borderBottom"></th>
                  <Header jobDetails={jobDetails} />
                </tr>
                <TableContent
                  employees={employees}
                  handleClick={this.handleClick}
                  taskInfoFromModal={taskInfoFromModal}
                />
                <TaskGrid jobDetails={jobDetails} />
              </tbody>
            </table>
            { showModal ? (
              <TaskModal
                items={itemsToBeShownInModal}
                handleItemClickOnModal={this.handleItemClickOnModal}
              />
              )
              : null
            }
          </div>
        </React.Fragment>
      )
    }
}

export default App;
