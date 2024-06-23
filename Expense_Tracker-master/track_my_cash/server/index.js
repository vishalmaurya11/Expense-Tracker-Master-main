import express from "express";
import cors from "cors";
import client from "./db.js";
import pg from "pg";

import signUpRoutes from "./routes/signUp.js";
import groupRoutes from "./routes/groups.mjs";
import individualRoutes from "./routes/individual.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use(
// 	cors({
// 		origin: ["https://trackmycash-zhjp.onrender.com", "https://trackmycash.onrender.com"],
// 		methods: ["POST", "PUT", "GET", "DELETE", "SHOW"],
// 		credentials: [true],
// 	})
// );

app.use("/auth", signUpRoutes);
app.use("/groups", groupRoutes);
app.use("/member", individualRoutes);

app.listen(5000, () => {
	console.log("server has started on port 5000");
});
