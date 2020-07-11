import React from 'react';

const TaskLayout = ({ name, jobname, date, index, isModal, handleItemClickOnModal }) => {
    const onClick = isModal ? handleItemClickOnModal : () => true;
    return (
        <div className="task-box" onClick={() => onClick(name, jobname, date, index)}>
          <div className="task-name">
            {name}
          </div>
          <div>
            {jobname}
          </div>
        </div>
    )
}
export default TaskLayout;
