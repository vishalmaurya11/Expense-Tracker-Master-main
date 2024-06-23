import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Select_Path from "./components/Select_Path";
import GroupDashBoard from "./components/Group_Dashboard";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Evaluation from "./components/Evaluation";
import React, { useState } from "react";
import GroupList from "./components/Group_List";
import Cookies from "universal-cookie";
import IndividualDashBoard from "./components/Individual_Dashboard";
import Group_Report from "./components/Group_Report";

const cookies = new Cookies();
//import Select_Path from "./components/Select_Path";

function App() {
	const [LoginUser, setLoginUser] = useState({
		mem_id: 0,
		email: "",
		password: "",
	});
	return (
		<>
			{/* <Navbar /> */}
			{/* <SignUp /> */}
			<Routes>
				<Route exact path="/SignUp" element={<SignUp />} />
				<Route exact path="/Select_Path" element={<Select_Path />} />
				<Route exact path="/home" element={<Home />} />
				<Route
					exact
					path="/individual"
					element={<IndividualDashBoard />}
				/>

				<Route
					exact
					path="/"
					element={<Login setLoginUser={setLoginUser} />}
				/>
				{/* <Route exact path="/Group" element={<GroupDashBoard />} /> */}
				<Route path="/Group/:id" element={<GroupDashBoard />} />
				<Route
					exact
					path="/GroupList"
					element={<GroupList User={LoginUser} />}
				/>
				<Route exact path="/Select" element={<Select_Path />} />
				<Route exact path="/Evaluate/:id" element={<Evaluation />} />
				<Route exact path="/Report/:id" element={<Group_Report />} />
			</Routes>
		</>
	);
}

export default App;
