import ThankYouIcon from '../assets/icon-thank-you.svg';

export default function ThanksPage() {
  return (
    <div className="thanks__page">
      <header className="thanks__header">
        <img src={ThankYouIcon} alt="icon" />
        <h2>Thank You!</h2>
      </header>
      <p className='thanks__text'>
        Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.
      </p>
    </div>
  )
}
