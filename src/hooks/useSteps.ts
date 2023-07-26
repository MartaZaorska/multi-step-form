import { useState } from 'react';

export default function useMultiStepForm(numberOfSteps: number){
  const [stepIndex, setStepIndex] = useState(0);
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === numberOfSteps - 1;

  const prev = () => { if(!isFirst) setStepIndex(prev => prev - 1); }
  const next = () => { if(!isLast) setStepIndex(prev => prev + 1); }
  const goTo = (i: number) => { if(i >= 0 && i < numberOfSteps && i !== stepIndex) setStepIndex(i); }

  return { stepIndex, isFirst, isLast, prev, next, goTo };
}