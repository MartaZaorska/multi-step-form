export type ReactElement = React.ReactNode | React.ReactElement | JSX.Element;

export type StepType = {
  element: ReactElement,
  name: string
};

export type PersonalDataType = {
  name: string,
  email: string,
  phone: string
};

export type AddOnType = {
  id: string,
  name: string,
  description: string,
  pricePerMonth: number
};

export type Plan = "arcade" | "advanced" | "pro";
export type Period = "monthly" | "yearly";

export type PlanType = { 
  type: "arcade" | "advanced" | "pro",
  pricePerMonth: number
};

export type FormDataType = PersonalDataType & {
  plan: PlanType,
  period: Period,
  addOns: string[]
};