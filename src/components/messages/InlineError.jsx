import React from 'react';
import PropTypes from 'prop-types';

export default function InlineError({ text }) {
  return <span style={{ color: '#ae5856' }}>{text}</span>;
}

InlineError.propTypes = {
  text: PropTypes.string.isRequired,
};
