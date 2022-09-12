import React from "react"
import Moment from 'moment'
import PropTypes from "prop-types"


export const DateData = ({ value }) => {
    return (<><span key="dateTag" className="date-badge">
        {Moment(new Date(value)).format('DD-MM-YYYY, HH:mm:ss')}
    </span></>)
}

DateData.propTypes = {
    value: PropTypes.string.isRequired
}