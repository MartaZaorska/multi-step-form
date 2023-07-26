import { memo } from 'react';
import { StepType } from "../types";

type Props = {
  goTo: (i: number) => void;
  steps: StepType[],
  stepIndex: number
}

function FormNavigation({goTo, steps, stepIndex}: Props) {
  return (
    <div className="form__navigation">
      {steps.map((step, index) => (
        <button key={`step-${step.name}`} onClick={() => goTo(index)} className={stepIndex === index ? "step__button--active" : "step__button"}>
          <span className="step__index">{index + 1}</span>
          <span className="step__name">
            <span>step {index + 1}</span>
            <mark>{step.name}</mark>
          </span>
        </button>
      ))}
    </div>
  )
}

export default memo(FormNavigation);