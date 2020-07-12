import React from "react";

const Header = ({ jobDetails }) => {
    const header = Object.keys(jobDetails);
    return(
        header.map((key, index) => {
           return <th key={index}>{`${key}-Apr-20`}</th>
        })
    )
}

export default Header