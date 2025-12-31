export const userActivationUrlEmailTemplete = ({ email, name, url }) => {
  return {
    from: `"Local Library" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Activate Your New Account",
    text: `Hello ${name}, follow the link to activate your account: ${url}`,
    html: `
      <p>Hello ${name}</p>
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
      <p>Hello ${name}</p>
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
      <p>Hello ${name}</p>
      <p>Your account is ready to use. you may go and sign in now</p>
     
    `,
  };
};

// EMAIL TEMPETE OF OTP
export const passwordResetOTPSendTemplate = ({ email,name, otp }) => {
  return {
    from: `"Local Library" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Your otp to reset the password",
    text: `Hello ${name}, Here is your OTP to reset your password. The OTP is ${otp}. It will exoire in 5 mins `,
    html: `
  
      <p>Hello ${name}, Here is your OTP to reset your password. The OTP is ${otp}. It will expire in 5 mins</p>
     
    `,
  };
};
