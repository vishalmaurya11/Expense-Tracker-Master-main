import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import "../componentsStyles/select_path.css";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Button from "@mui/material/Button";

function Select_Path() {
	// if(cookies.get('Member')=='undefined'||cookies.get('Member')=='null'){
	const navigate = useNavigate();

	const cookies = new Cookies();
	console.log(cookies.get("Member"));
	useEffect(() => {
		if (!cookies.get("Member")) {
			console.log("Mem1");
			navigate("/");
		}
	});
	// 	navigate('/');
	// }
	return (
		<div>
			<React.Fragment>
				<div className="page1">
				<div className="container p-4">
					<div className="row justify-content-around">
						<div className="col-md-5 shadow p-3 mb-5 bg-white rounded text-center">
							<PersonIcon style={{ fontSize: 350 }} />
							<div className="display-4 header-text">
								My Expenses
							</div>
							<div className="mt-5">
								<button
									className="select_button"
									onClick={() => navigate("/Individual")}
								>
									SELECT
								</button>
							</div>
						</div>
						<div className="col-md-5 shadow p-3 mb-5 bg-white rounded text-center">
							<GroupsIcon style={{ fontSize: 350 }} />
							<div className="display-4 header-text">Groups</div>
							<div className=" mt-5">
								<button
									className="select_button"
									onClick={() => navigate("/GroupList")}
								>
									SELECT
								</button>
							</div>
						</div>
					</div>
				</div>
				</div>
			</React.Fragment>
		</div>
	);
}

export default Select_Path;
