import { useState } from 'react';
import useMultiStepForm from "./hooks/useSteps";
import { validatePersonalDetails } from './utils';
import { StepType, FormDataType, PersonalDataType } from "./types";

import FormNavigation from './components/FormNavigation';
import PersonalInfoForm from "./components/PersonalInfoForm";
import ThanksPage from './components/ThanksPage';
import PlanForm from './components/PlanForm';
import AddOnsForm from './components/AddOnsForm';
import Confirmation from './components/Confirmation';

const initialFormData: FormDataType = {
  name: "",
  email: "",
  phone: "",
  period: "monthly",
  plan: { type: "arcade", pricePerMonth: 9 },
  addOns: ["online-service"]
};

export default function App() {
  const [data, setData] = useState<FormDataType>(initialFormData);
  const [messages, setMessages] = useState<PersonalDataType>({ name: "", email: "", phone: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const update = (updatedData: Partial<FormDataType>) => {
    setData(prevData => ({...prevData, ...updatedData}));
  }

  const {stepIndex, next, prev, goTo, isFirst, isLast} = useMultiStepForm(4);

  const steps: StepType[] = [
    { element: <PersonalInfoForm {...data} messages={messages} setMessages={setMessages} update={update} />, name: "Your info" },
    { element: <PlanForm {...data} update={update} />, name: "Select plan" },
    { element: <AddOnsForm {...data} update={update} />, name: "Add-ons" },
    { element: <Confirmation {...data} goTo={goTo} />, name: "Summary" }
  ];

  const submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if((validatePersonalDetails(data.name, data.email, data.phone))) setIsSubmitted(true);
    else goTo(0);
  }

  const changeStep = (cb: Function) => {
    return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      cb();
    }
  }

  return (
    <div className="container">
      <FormNavigation steps={steps} stepIndex={stepIndex} goTo={goTo} />
      <main className="form__wrapper">
        {isSubmitted ? <ThanksPage /> : (
          <form className="form">
            <div className="form__content">
              {steps[stepIndex].element}
            </div>
            <div className='form__controls'>
              {isLast ? (
                <button className="button--confirm" type="submit" onClick={submitForm}>Confirm</button>
              ) : (
                <button className="button--next" onClick={changeStep(next)}>Next step</button>
              )}
              {!isFirst && <button className="button--back" onClick={changeStep(prev)}>Go back</button>}
            </div>
          </form>
        )}
      </main>
    </div>
  )
}