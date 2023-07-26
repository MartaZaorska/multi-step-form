import { memo } from 'react';
import { PersonalDataType } from "../types";
import { validateEmail, validatePhone, validateName, debounce } from "../utils";

type Props = {
  name: string,
  email: string,
  phone: string,
  messages: PersonalDataType,
  setMessages: React.Dispatch<React.SetStateAction<PersonalDataType>>,
  update: (updatedData: Partial<PersonalDataType>) => void;
};

const VALIDATION: { [prop: string]: (value: string) => boolean} = {
  "name": validateName,
  "email": validateEmail,
  "phone": validatePhone
};

function PersonalInfoForm({ name, email, phone, messages, update, setMessages }: Props) {
  const updateDebounceValue = debounce<string>((name, value) => update({ [name]: value }));

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => updateDebounceValue(e.target.name, e.target.value);

  const blurInput = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if(e.target.value === "") setMessages(prev => ({...prev, [e.target.name]: "This field is required" }));
    else if(!VALIDATION[e.target.name](e.target.value)) setMessages(prev => ({...prev, [e.target.name]: "Please enter a valid value"}));
    else setMessages(prev => ({ ...prev, [e.target.name]: "" }));
  }
  
  const focusInput = (e: React.FocusEvent<HTMLInputElement, Element>) => setMessages(prev => ({ ...prev, [e.target.name]: "" }));

  return (
    <>
      <header className="form__header">
        <h2>Personal info</h2>
        <p>Please provide your name, email address, and phone number.</p>
      </header>
      <div className="input__control">
        <label htmlFor="name">Name</label>
        <span className="error">{messages.name}</span>
        <input className={messages.name && "input--error"} type="text" id="name" name="name" placeholder="e.g. Stephen King" defaultValue={name} onChange={changeValue} onBlur={blurInput} onFocus={focusInput} />
      </div>
      <div className="input__control">
        <label htmlFor="email">Email Address</label>
        <span className="error">{messages.email}</span>
        <input type="text" className={messages.email && "input--error"} id="email" name="email" placeholder="e.g. stephenking@lorem.com" defaultValue={email} onChange={changeValue} onBlur={blurInput} onFocus={focusInput} />
      </div>
      <div className="input__control">
        <label htmlFor="phone">Phone number</label>
        <span className="error">{messages.phone}</span>
        <input type="text" className={messages.phone && "input--error"} id="phone" name="phone" placeholder="e.g. +1 234 567 890" defaultValue={phone} onChange={changeValue} onBlur={blurInput} onFocus={focusInput} />
      </div>
    </>
  )
}

export default memo(PersonalInfoForm);