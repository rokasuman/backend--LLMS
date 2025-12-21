export const userActivationUrlEmailTemplete = ({ email, name, url }) => {
  return {
    from: `"Local Library" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Activate Your New Account",
    text: `Hello ${name}, follow the link to activate your account: ${url}`,
    html: `
      <p>Hello ${name},</p>
      <p>Your account has been created. Click the button below to activate it:</p>
      <a href="${url}">
        <button style="background:green;color:white;padding:1rem 2rem;border:none;border-radius:6px">
          Activate Now
        </button>
      </a>
    `,
  };
};
