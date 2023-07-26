export function validateEmail(email: string): boolean {
  return email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) ? true : false;
}

export function validatePhone(phone: string): boolean {
  return phone.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g) ? true : false;
}

export function validateName(name: string): boolean {
  return name.match(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm) ? true : false;
}

export function debounce<T>(cb: (...args: T[]) => void, delay: number = 1000){
  let timeout: number;
  return (...args: T[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => cb(...args), delay);
  }
}

export function validatePersonalDetails(name: string, email: string, phone: string): boolean {
  if(name === "" || !validateName(name)) return false;
  if(email === "" || !validateEmail(email)) return false;
  if(phone === "" || !validatePhone(phone)) return false;
  return true;
}