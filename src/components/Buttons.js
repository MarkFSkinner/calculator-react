import React from 'react';

const Buttons = props => (
  <div id='button-container'>
    <div className='row'>
      <div className='col-3'>
        <button type='button' id='ac-button' className='btn btn-primary btn-function'>AC</button>
      </div>
      <div className='col-3'>
        <button type='button' id='ce-button' className='btn btn-primary btn-function'>CE</button>
      </div>
      <div className='col-3'>
        <button type='button' id='back-button' className='btn btn-primary btn-function'><i className='fas fa-backspace'></i></button>
      </div>
      <div className='col-3'>
        <button type='button' id='divide-button' className='btn btn-primary'><i className='fas fa-divide'></i></button>
      </div>
    </div>
    <div className='row'>
      <div className='col-3'>
        <button type='button' id='seven-button' className='btn btn-primary'>7</button>
      </div>
      <div className='col-3'>
        <button type='button' id='eight-button' className='btn btn-primary'>8</button>
      </div>
      <div className='col-3'>
        <button type='button' id='nine-button' className='btn btn-primary'>9</button>
      </div>
      <div className='col-3'>
        <button type='button' id='multiply-button' className='btn btn-primary'><i className='fas fa-times'></i></button>
      </div>
    </div>
    <div className='row'>
      <div className='col-3'>
        <button type='button' id='four-button' className='btn btn-primary'>4</button>
      </div>
      <div className='col-3'>
        <button type='button' id='five-button' className='btn btn-primary'>5</button>
      </div>
      <div className='col-3'>
        <button type='button' id='six-button' className='btn btn-primary'>6</button>
      </div>
      <div className='col-3'>
        <button type='button' id='minus-button' className='btn btn-primary'><i className='fas fa-minus'></i></button>
      </div>
    </div>
    <div className='row'>
      <div className='col-3'>
        <button type='button' id='one-button' className='btn btn-primary'>1</button>
      </div>
      <div className='col-3'>
        <button type='button' id='two-button' className='btn btn-primary'>2</button>
      </div>
      <div className='col-3'>
        <button type='button' id='three-button' className='btn btn-primary'>3</button>
      </div>
      <div className='col-3'>
        <button type='button' id='add-button' className='btn btn-primary'><i className='fas fa-plus'></i></button>
      </div>
    </div>
    <div className='row'>
      <div className='col-3'>
        <button type='button' id='negative-button' className='btn btn-primary'>(-)</button>
      </div>
      <div className='col-3'>
        <button type='button' id='zero-button' className='btn btn-primary'>0</button>
      </div>
      <div className='col-3'>
        <button type='button' id='decimal-button' className='btn btn-primary'>.</button>
      </div>
      <div className='col-3'>
        <button type='button' id='equals-button' className='btn btn-primary'><i className='fas fa-equals'></i></button>
      </div>
    </div>
  </div>
);

export default Buttons;