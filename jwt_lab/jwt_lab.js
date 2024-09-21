const jwt = require("jsonwebtoken");

// Function to create and sign a JWT
function createJWT() {
  const payload = {
    userId: 123,
    username: "exampleUser",
  };
  const secretKey = "myKey"; // Replace with your secret key

  // Sign the JWT with the payload and secret key
  const token = jwt.sign(payload, secretKey);

  console.log("JWT Token:", token);
  return token;
}

// Call the function to create and sign a JWT
generatedToken = createJWT();

// Function to verify a JWT
function verifyJWT(token) {
  const secretKey = "myKey"; // Replace with your secret key

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error("JWT Verification Failed:", err.message);
    } else {
      console.log("JWT Verified. Decoded:", decoded);
    }
  });
}

// Replace 'yourTokenHere' with a JWT token you generated in Step 4
const jwtTokenToVerify = generatedToken;

// Call the function to verify the JWT
verifyJWT(jwtTokenToVerify);

// Function to decode a JWT
function decodeJWT(token) {
  const decoded = jwt.decode(token);

  console.log("Decoded JWT:", decoded);
}

// Replace 'yourTokenHere' with a JWT token you generated in Step 4
const jwtToken = generatedToken;

// Call the function to decode the JWT
decodeJWT(jwtToken);
