import React from 'react';
import PropTypes from 'prop-types';

export default function CurrentUser({name}) {
    return (<div className='current-user'>Current user: {name}</div>);
}

CurrentUser.propTypes = {
    name: PropTypes.string.isRequired
};