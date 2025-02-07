require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./connectDB');
const cors = require('cors');

const app = express();

app.use(
	cors({
	  origin: [process.env.FRONTEND_URL],
	  method: ["GET", "POST", "DELETE", "PUT"],
	  credentials: true,
	})
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
	connectDB();
});

app.get('/', (req, res) => {
    res.send('this is root');
});

// auth routes
const auth = require('./routes/auth');
app.use("/auth", auth);

// question routes
const ques = require('./routes/question');
app.use("/ques", ques);