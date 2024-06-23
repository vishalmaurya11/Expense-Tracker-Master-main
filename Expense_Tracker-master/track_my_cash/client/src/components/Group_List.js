import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import FloatingSidebar from "./Floating_Sidebar_grouplist";
import "../componentsStyles/group_dashboard.css";
import Group_Card from "./Group_Card";
import groups from "./tempGroups";
import axios from "axios";
import Button from "@mui/material/Button";

import Cookies from "universal-cookie";
import { Navigate, useNavigate } from "react-router-dom";

// import members from "./Add_Group_expense";

const cookies = new Cookies();

const GroupList = ({ User }) => {
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log(user);
		cookies.remove("Member");
		console.log(cookies.get("Member"));
		navigate("/");
	};
	if (!cookies.get("Member")) {
		navigate("/");
	}
	const [groupsArr, setgroupsArr] = useState(groups);
	const onChangeState = (newState) => {
		setgroupsArr(newState);
	};
	useEffect(() => {
		const fetchGroups = async (e) => {
			await axios
				.post("https://trackmycash.onrender.com/groups", cookies.get("Member"))
				.then((res) => {
					setgroupsArr(res.data.rows);
					console.log(groupsArr);
				});
		};
		fetchGroups();
	}, []);

	return (
		<React.Fragment>
			<div className="page1">
				<Sidebar />
				<FloatingSidebar
					logo={{ flag: true }}
					state={groupsArr}
					setState={onChangeState}
				/>

				<div className="container mt-4">
					<div className="card">
						<div className="card-header">Featured</div>
						<div className="card-body">
							<div className="row">
								<div className="col-md-12">
									{groupsArr.map((group) => {
										return <Group_Card content={group} />;
									})}
								</div>
							</div>
						</div>
					</div><Button variant ="contained"
					type="button"
					class="btn"
					style ={{backgroundColor:"#cd817a",color:"white",margin:"10px"}}

					 onClick={() => navigate("/Report/" + cookies.get("Member").mem_id)}>Report</Button>
				</div>
				
				{/* <button onClick={handleSubmit}>Log Out</button> */}
			</div>
		</React.Fragment>
	);
};

export default GroupList;
export { groups };
