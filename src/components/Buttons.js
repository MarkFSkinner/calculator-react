import React from 'react';

const Buttons = props => (
  <div id='button-container'>
    <div className='row'>
      <div className='col-3'>
        <button type='button' id='ac-button' className='btn btn-primary btn-function' onClick={props.handleAcButtonClick}>AC</button>
      </div>
      <div className='col-3'>
        <button type='button' id='ce-button' className='btn btn-primary btn-function' onClick={props.handleCeButtonClick}>CE</button>
      </div>
      <div className='col-3'>
        <button type='button' id='back-button' className='btn btn-primary btn-function' onClick={props.handleBackButtonClick}><i className='fas fa-backspace'></i></button>
      </div>
      <div className='col-3'>
        <button type='button' id='divide-button' className='btn btn-primary' onClick={props.handleOperatorButtonClick}><i className='fas fa-divide'></i></button>
      </div>
    </div>
    <div className='row'>
      <div className='col-3'>
        <button type='button' id='seven-button' className='btn btn-primary' onClick={props.handleNumberButtonClick}>7</button>
      </div>
      <div className='col-3'>
        <button type='button' id='eight-button' className='btn btn-primary' onClick={props.handleEightButtonClick}>8</button>
      </div>
      <div className='col-3'>
        <button type='button' id='nine-button' className='btn btn-primary' onClick={props.handleNumberButtonClick}>9</button>
      </div>
      <div className='col-3'>
        <button type='button' id='multiply-button' className='btn btn-primary' onClick={props.handleOperatorButtonClick}><i className='fas fa-times'></i></button>
      </div>
    </div>
    <div className='row'>
      <div className='col-3'>
        <button type='button' id='four-button' className='btn btn-primary' onClick={props.handleNumberButtonClick}>4</button>
      </div>
      <div className='col-3'>
        <button type='button' id='five-button' className='btn btn-primary' onClick={props.handleNumberButtonClick}>5</button>
      </div>
      <div className='col-3'>
        <button type='button' id='six-button' className='btn btn-primary' onClick={props.handleNumberButtonClick}>6</button>
      </div>
      <div className='col-3'>
        <button type='button' id='minus-button' className='btn btn-primary' onClick={props.handleOperatorButtonClick}><i className='fas fa-minus'></i></button>
      </div>
    </div>
    <div className='row'>
      <div className='col-3'>
        <button type='button' id='one-button' className='btn btn-primary' onClick={props.handleNumberButtonClick}>1</button>
      </div>
      <div className='col-3'>
        <button type='button' id='two-button' className='btn btn-primary' onClick={props.handleNumberButtonClick}>2</button>
      </div>
      <div className='col-3'>
        <button type='button' id='three-button' className='btn btn-primary' onClick={props.handleNumberButtonClick}>3</button>
      </div>
      <div className='col-3'>
        <button type='button' id='add-button' className='btn btn-primary' onClick={props.handleOperatorButtonClick}><i className='fas fa-plus'></i></button>
      </div>
    </div>
    <div className='row'>
      <div className='col-3'>
        <button type='button' id='negative-button' className='btn btn-primary' onClick={props.handleNegativeButtonClick}>(-)</button>
      </div>
      <div className='col-3'>
        <button type='button' id='zero-button' className='btn btn-primary' onClick={props.handleNumberButtonClick}>0</button>
      </div>
      <div className='col-3'>
        <button type='button' id='decimal-button' className='btn btn-primary' onClick={props.handleNumberButtonClick}>.</button>
      </div>
      <div className='col-3'>
        <button type='button' id='equals-button' className='btn btn-primary' onClick={props.handleEqualsButtonClick}><i className='fas fa-equals'></i></button>
      </div>
    </div>
  </div>
);

export default Buttons;