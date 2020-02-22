export default numberOfCharacters => {
  let password = "";
  const characters = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()`;
  for (let i = 0; i < numberOfCharacters; i++) {
    password += characters[Math.floor(Math.random() * characters.length)];
  }
  return password;
};
