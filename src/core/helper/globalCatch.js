
 function globalCatch(req, err) {
    console.log(
      `Error in catch with route ${req.path} with method ${req.method} and with message ${err.message}`
    );
  }
  export{globalCatch}

