export const userActivationUrlEmailTemplete = ({ email, name, url }) => {
  return {
    from: `"Local Library" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Activate Your New Account",
    text: `Hello ${name}, follow the link to activate your account: ${url}`,
    html: `
      <p>Hello</p>
      <p>Your account has been created. Click the button below to activate it:</p>
      <a href="${url}">
        <button style="background:green;color:white;padding:1rem 2rem;border:none;border-radius:6px">
          Activate Now
        </button>
      </a>
    `,
  };
};


export const userAccountActivatedNotification = ({ email, name }) => {
  return {
    from: `"Local Library" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Your account is now active",
    text: `Hello ${name}, Your account is ready to use. you may go and sign in now `,
    html: `
      <p>Hello</p>
      <p>Your account is ready to use. you may go and sign in now</p>
      
    `,
  };
};

export const userAccountActivatedNotificationTemplate = ({ email, name }) => {
  return {
    from: `"Local Library" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Your account is now active",
    text: `Hello ${name}, Your account is ready to use. you may go and sign in now `,
    html: `
      <p>Hello</p>
      <p>Your account is ready to use. you may go and sign in now</p>
     
    `,
  };
};
