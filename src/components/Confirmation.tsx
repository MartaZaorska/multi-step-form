import { useMemo, memo } from 'react';
import { Period, PlanType, AddOnType } from "../types";
import { ADD_ONS } from '../data/constants';

type Props = {
  period: Period,
  plan: PlanType,
  addOns: string[],
  goTo: (i: number) => void;
}

function Confirmation({ period, plan, addOns, goTo }: Props) {
  const addOnsDetails: AddOnType[] = useMemo(() => {
    const data: AddOnType[] = [];
    addOns.forEach(id => {
      const item = ADD_ONS.find(addOn => addOn.id === id);
      if(item) data.push({...item});
    });
    return data;
  }, [addOns]);

  const total = useMemo(() => {
    const planPrice = period === "monthly" ? plan.pricePerMonth : plan.pricePerMonth * 10;
    const addOnsPrice = addOnsDetails.reduce((price, addOn) => price + (period === "monthly" ? addOn.pricePerMonth : addOn.pricePerMonth * 10), 0);
    return planPrice + addOnsPrice;
  }, [plan, period, addOnsDetails]);

  return (
    <>
      <header className="form__header">
        <h2>Finishing up</h2>
        <p>Double-check everything looks OK before confirming.</p>
      </header>
      <div className="details__wrapper">
        <div className="plan__content">
          <header className="plan__header">
            <h3>{plan.type} ({period})</h3>
            <button onClick={() => goTo(1)}>Change</button>
          </header>
          <span className="plan__price">${period === "monthly" ? `${plan.pricePerMonth}/mo` : `${plan.pricePerMonth * 10}/yr`}</span>
        </div>
        <span className="stripe"></span>
        {addOnsDetails.map(addOn => (
          <div className="addon__content" key={`${addOn.id}-confirm`}>
            <span className="name">{addOn.name}</span>
            <span className="price">+${period === "monthly" ? `${addOn.pricePerMonth}/mo` : `${addOn.pricePerMonth * 10}/yr`}</span>
          </div>
        ))}
      </div>
      <div className="total">
        <span className='name'>Total (per {period === "monthly" ? "month" : "year"})</span>
        <span className='price'>${total}/{period === "monthly" ? "mo" : "yr"}</span>
      </div>
    </>
  )
}

export default memo(Confirmation);