const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose
  .connect("mongodb://localhost:27017/express-bcrypt-demo")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

app.post("/api/users1", async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("Received username:", username);
    const start = Date.now();
    // Generate a salt (a random value added to the hash to increase security)
    const salt = await bcrypt.genSalt(16); // 10 rounds of salt generation
    console.log("Generated salt:", salt);

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(
      "time taken to hash password:",
      (Date.now() - start) / 1000,
      "s."
    );

    // Create a new user with the hashed password
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/users1/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the input password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
