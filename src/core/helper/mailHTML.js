const mailHTML = (htmlResponse) => {
  switch (htmlResponse) {
    case "signUpSuccess":
      return `<h2>Welcome on board user!!</h2>
                    <p>Thank you for choosing us we look forward to deliver you 
                    and hope you find all the joy that you are looking for here.</p>
                    </br> <p>Welcome to 55 chitchat family <h2>Bon appetit!!</h2>  </p>`;

      break;

    default:
      break;
  }
};
export default mailHTML;
