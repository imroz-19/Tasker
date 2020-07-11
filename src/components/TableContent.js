import React from 'react';

export default class TableContent extends React.Component{

    constructor(props){
        super(props);

        this.state={
            taskInfoFromModal: [{
                rowIndex: -1,
                columnIndex: -1,
                task: null
              }]
        }
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

    render(){
        return this.props.employees.map((employee, row) => {
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
}