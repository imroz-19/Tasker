import React from 'react';
import TaskLayout from '../components/TaskLayout';

const getGridContent = (taskInfoFromModal, row, column) => {
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
const TableContent  = (props) => {
  let content = '';
  return props.employees.map((employee, row) => {
    const { Name } = employee;
    return (
      <tr key={row}>
        <td className="empName">{Name}</td>
        {[0, 1, 2, 3, 4].map((column) => {
          content = getGridContent(props.taskInfoFromModal, row, column);
          return (
            <td key={`${column}-$-${row}`} onClick={() => props.handleClick(column, row)}>
              <div className="task-grid">{content}</div>
            </td>
          );
        })}
      </tr>
    );
  });
};
export default TableContent;
