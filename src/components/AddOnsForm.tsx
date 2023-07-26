import { memo } from 'react';
import { Period } from '../types';
import { ADD_ONS } from '../data/constants';

import CheckmarkIcon from '../assets/icon-checkmark.svg';

type Props = {
  addOns: string[],
  period: Period,
  update: (updatedData: Partial<{ addOns: string[] }>) => void;
}

function AddOnsForm({addOns, period, update}: Props) {
  const updateAddOns = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(addOns.includes(e.target.value)){
      update({ addOns: addOns.filter(addOn => addOn !== e.target.value) });
    }else{
      update({ addOns: [...addOns, e.target.value] });
    }
  }

  return (
    <>
      <header className="form__header">
        <h2>Pick add-ons</h2>
        <p>Add-ons help enhance your gaming experience.</p>
      </header>
      {ADD_ONS.map((addOn) => {
        const checked = addOns.includes(addOn.id);
        return (
          <div className={checked ? "addon__control checked" : "addon__control"} key={`${addOn.id}-input`}>
            <input type="checkbox" value={addOn.id} id={addOn.id} defaultChecked={checked} onChange={updateAddOns} />
            <label htmlFor={addOn.id}>
              <span className='label__checkmark'><img src={CheckmarkIcon} alt="checkmark icon" /></span>
              <span className='label__text'>
                <mark>{addOn.name}</mark>
                <span>{addOn.description}</span>
              </span>
              <span className="label__price">{period === "monthly" ? `+$${addOn.pricePerMonth}/mo` : `+$${addOn.pricePerMonth*10}/yr`}</span>
            </label>
          </div>
        )
      })}
    </>
  )
}

export default memo(AddOnsForm);