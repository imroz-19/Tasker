import React from 'react';
import TaskLayout from './TaskLayout';

const TaskModal = ({ items = {}, handleItemClickOnModal }) => {    
    return (
        Object.keys(items).length > 0 ?
        <div className="modal-wrapper">
            <div className="modal-content">
                {
                    items.list.map(({name, jobname}, index) => {
                        return (
                            <TaskLayout
                                key={`${name}-${jobname}-${index}`}
                                name={name}
                                jobname={jobname}
                                date={items.date}
                                isModal
                                index={index}
                                handleItemClickOnModal={handleItemClickOnModal}
                            />
                        );
                    })
                }
            </div>
        </div>
        : null
    );
}

export default TaskModal;
