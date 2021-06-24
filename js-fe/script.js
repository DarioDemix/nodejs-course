const generateScript = () => {
  const frontendScript = () => {
    document.getElementById("add-user").focus();
  };

  return frontendScript.toString();
};

module.exports = generateScript;
