import React from 'react';
import TaskLayout from './TaskLayout';

const TaskGrid = ({ jobDetails = {} }) => {
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
    );
}
export default TaskGrid;
