import { PlanType, AddOnType} from '../types';

export const PLANS: PlanType[] = [
  { type: "arcade", pricePerMonth: 9 },
  { type: "advanced", pricePerMonth: 12 },
  { type: "pro", pricePerMonth: 15 }
];

export const ADD_ONS: AddOnType[] = [
  { id: "online-service", name: "Online service", description: "Access to multiplayer games", pricePerMonth: 1 },
  { id: "larger-storage", name: "Larger storage", description: "Extra 1TB of cloud save", pricePerMonth: 2 },
  { id: "customizable-profile", name: "Customizable profile", description: "Custom theme on your profile", pricePerMonth: 2 }
];