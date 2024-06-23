import express from "express";
import {
	addExpense,
	getGroups,
	getMembers,
	showExpenses,
	getShareAmount,
	getTotalAmount,
	addGroup,
	addMember,
	settleExp,
} from "../controllers/Groups.controller.js";

import {sendSMS} from "../controllers/Message.controller.cjs";


// import pkg from "../controllers/Message.controller.cjs";
// const {sendSMS} = pkg;
const router = express.Router();
router.post("/message",sendSMS);
router.post("/settle/:id", settleExp);
router.post("/addMem", addMember);
router.post("/add", addGroup);
router.post("/", getGroups);
router.get("/members/:id", getMembers);
router.get("/amount/:id", getTotalAmount);
router.get("/share/:id", getShareAmount);
router.get("/:id", showExpenses);
router.post("/:id", addExpense);


export default router;
