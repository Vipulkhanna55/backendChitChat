const mailHTML = (htmlResponse) => {
  switch (htmlResponse) {
    case "signUpSuccess":
      return `
      <div style="background-image: linear-gradient(to right top, #a6d0dd, #99c1f0, #c0a5ec, #f280bc, #ff6969);
      padding:15px; border-radius:10px; color: #fff;">
      <h2 >Welcome on board user!!</h2>
                    <p>Thank you for choosing us we look forward to deliver you 
                    and hope you find all the joy that you are looking for here.</p>
                    </br> <p>Welcome to 55 chitchat family <h2>Bon appetit!!</h2>  </p>

                    <div style="margin: 50px 0 10px 0;">
                    <h1 style="font-size:50px;text-align:center">55<span style="font-size:16px">ChitChat</span></h1></div>
                    </div>`;

      break;

    default:
      break;
  }
};
export default mailHTML;
