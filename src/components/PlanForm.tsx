import { memo } from 'react';
import { PlanType, Period, Plan } from "../types";
import { PLANS } from '../data/constants';

import IconArcade from '../assets/icon-arcade.svg';
import IconAdvanced from '../assets/icon-advanced.svg';
import IconPro from '../assets/icon-pro.svg';

type Props = {
  plan: PlanType,
  period: Period,
  update: (updatedData: Partial<{plan: PlanType, period: Period}>) => void;
}

const ICONS = [IconArcade, IconAdvanced, IconPro];

function PlanForm({ plan, period, update }: Props) {
  const changePlanType = (planType: Plan) => update({ plan: { ...plan, type: planType } });

  const changePeriod = (period: Period) => update({ period });

  return (
    <>
      <header className="form__header">
        <h2>Select your plan</h2>
        <p>You have the option of monthly or yearly billing.</p>
      </header>
      <div className='plan__wrapper'>
        {PLANS.map((item, index) => (
          <div className='type__control' key={`${item.type}-input`}>
            <input type="radio" name="type" id={item.type} value={item.type} defaultChecked={item.type === plan.type} onChange={() => changePlanType(item.type)} />
            <label htmlFor={item.type}>
              <span className='label__icon'><img src={ICONS[index]} alt="icon" /></span>
              <span className='label__text'>
                <mark>{item.type}</mark>
                <span className="light">{period === "monthly" ? `$${item.pricePerMonth}/mo` : `$${item.pricePerMonth*10}/yr`}</span>
                {period === "yearly" && <span className="extra">2 months free</span>}
              </span>
            </label>
          </div>
        ))}
      </div>
      <div className="period__wrapper">
        <div className="period__control">
          <input type="radio" name="period" id="monthly" value="monthly" defaultChecked={period === "monthly"} onChange={() => changePeriod("monthly")} />
          <label htmlFor="monthly">Monthly</label>
        </div>
        <button onClick={(e) => {e.preventDefault(); changePeriod(period === "monthly" ? "yearly" : "monthly"); }} className={period === "monthly" ? "period__switch left" : "period__switch right"}>
          <span className="dot"></span>
        </button>
        <div className="period__control">
          <input type="radio" id="yearly" name="period" value="yearly" defaultChecked={period === "yearly"} onChange={() => changePeriod("yearly")} />
          <label htmlFor="yearly">Yearly</label>
        </div>
      </div>
    </>
  )
}

export default memo(PlanForm);