import React, { useState } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';
import '../Coins.css';

const SortMenu = ({curatedList, sorted}) => {

  const amountHiLo = () => {
    console.log("amount Hi Lo", sorted);
    return curatedList.sort( (a, b) => b.userAmount - a.userAmount);
  };
  
  const amountLoHi = () => {
    console.log("amount Lo Hi", sorted);
    return curatedList.sort( (a, b) => a.userAmount - b.userAmount);
    
  };
  
  const walletHiLo = () => {
    console.log("Funds Hi Lo", sorted);
    return curatedList.sort( (a, b) => b.wallet - a.wallet);
    
  };
  
  const walletLoHi = () => { 
    console.log("Funds Lo Hi", sorted);
    return curatedList.sort( (a, b) => a.wallet - b.wallet);
    
  };
  
  const priceHiLo = () => {
    console.log("Price Hi Lo", sorted);
    return curatedList.sort( (a, b) => b.current_price - a.current_price);
    
  };
  
  const priceLoHi = () => {
    console.log("Price Lo Hi", sorted);
    return curatedList.sort( (a, b) => a.current_price - b.current_price);

};

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
    className='drop-toggle'
    href="/myList"
    ref={ref}
    onClick={(e) => {
        e.preventDefault();
        onClick(e);
    }}
    >
      {children}
      &#x25bc;
    </a>
));
  
  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');
  
      return (
        <div
          ref={ref}
          style={style}
          className='drop-body'
          aria-labelledby={labeledBy}
        >
          <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );
  
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        Sorting Filter
      </Dropdown.Toggle>
  
      <Dropdown.Menu as={CustomMenu} >
        <Dropdown.Item eventKey="1" onClick={() => sorted(amountHiLo)}>Amount high-low</Dropdown.Item>
        <Dropdown.Item eventKey="2" onClick={() => sorted(amountLoHi)}>Amount low-high</Dropdown.Item>
        <Dropdown.Item eventKey="3" onClick={() => sorted(walletHiLo)}>Funds high-low</Dropdown.Item>
        <Dropdown.Item eventKey="4" onClick={() => sorted(walletLoHi)}>Funds low-high</Dropdown.Item>
        <Dropdown.Item eventKey="5" onClick={() => sorted(priceHiLo)}>Price high-low</Dropdown.Item>
        <Dropdown.Item eventKey="6" onClick={() => sorted(priceLoHi)}>Price low-high</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
    
export default SortMenu










    // <>
    //     <div className="mb-2">
    //         <DropdownButton
    //             as={ButtonGroup}
    //             key='up'
    //             id={`dropdown-button-drop-up`}
    //             drop='up'
    //             variant="secondary"
    //             title={` Drop up `}
    //         >
    //             <Dropdown.Item eventKey="1">Action</Dropdown.Item>
    //             <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
    //             <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
    //             <Dropdown.Divider />
    //             <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
    //         </DropdownButton>
    //     </div>
    // </>
