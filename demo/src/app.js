import React from 'react';
import { render } from 'react-dom';
import { Validator } from '../../src/index';

require('file-loader?name=[name].[ext]!./index.html');

const requiredValidator = (value, message = 'Required') => {
  return !!value ? true : Promise.reject(message);
};

const SomeInput = ({ inputValue }) => (
  <Validator validators={requiredValidator}>
    {({ validate, isValid, message }) => (
      <div>
        <input
          type="text"
          value={inputValue}
          className={isValid ? 'normal-input' : 'invalid-input'}
          onBlur={e => validate(e.target.value)}
        />

        {message && <div>{message}</div>}
      </div>
    )}
  </Validator>
);

render(
  <SomeInput />,
  document.getElementById('app')
);