import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../componentsStyles/modal.css";
import Button from "@mui/material/Button";

import axios from "axios";
import Cookies from "universal-cookie";
let members = [];

function Add_new_Group({ setOpenModal, state, setState }) {
	const cookies = new Cookies();
	const Member_Id = cookies.get("Member").mem_id;
	const getCurrentDate = (separator = "/") => {
		let newDate = new Date();
		let date = newDate.getDate();
		let month = newDate.getMonth() + 1;
		let year = newDate.getFullYear();

		return `${year}${separator}${
			month < 10 ? `0${month}` : `${month}`
		}${separator}${date}`;
	};
	const [group, setgroup] = useState({
		owner_id: Member_Id,
		name: "",
		created_on: getCurrentDate(),
	});
	const [memberList, setmemberList] = useState([
		{
			mem_id: "",
		},
	]);
	const handleGroupInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		let code = value.charCodeAt(value.length - 1);
		if (
			(code > 47 && code < 58) ||
			(code > 64 && code < 91) ||
			(code > 96 && code < 123) ||
			value.charAt(value.length - 1) === "" ||
			value.charAt(value.length - 1) === " "
		) {
			setgroup({ ...group, [name]: value });
		}
	};
	const handleMemInput = (index, e) => {
		const name = e.target.name;
		const value = e.target.value;
		let code = value.charCodeAt(value.length - 1);
		if ((code > 47 && code < 58) || value.charAt(value.length - 1) === "") {
			memberList[index].mem_id = value;
			setmemberList([...memberList]);
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (group.name === "") {
			alert("Group name cant be empty");
		} else {
			setgroup({ ...group, created_on: getCurrentDate() });
			let json = {
				group: group,
				members: memberList,
			};
			console.log(json);
			axios.post("https://trackmycash.onrender.com/groups/add", json).then((res) => {
				console.log(res.data);
			});

			setOpenModal(false);
			window.location.reload();
		}
	};
	const addInputField = (e) => {
		e.preventDefault();
		setmemberList([...memberList, { mem_id: "" }]);
	};

	return (
		<div className="modalBackground">
			<div className="modalContainer">
				<div className="titleCloseBtn">
					<button
						onClick={() => {
							setOpenModal(false);
						}}
					>
						X
					</button>
				</div>
				<div className="title">
					<h1>Add New Group</h1>
				</div>
				<div className="body">
					<p>
						<div className="card">
							<form action="" onSubmit={handleSubmit}>
								<input
									type="text"
									class="form-control"
									name="name"
									value={group.name}
									onChange={handleGroupInput}
									placeholder="Group Name"
									required
								/>
								<label>Add Members</label>
								{memberList.map((members, index) => (
									<div className="d-flex">
										<div>
											<input
												type="text"
												class="form-control"
												name="mem_id"
												value={memberList[index].mem_id}
												onChange={(e) =>
													handleMemInput(index, e)
												}
												placeholder={
													"Member Name " + index
												}
											/>
											{memberList.length - 1 ===
												index && (
												<Button variant ="contained"
												type="button"
												class="btn"
												style ={{backgroundColor:"#cd817a",color:"white"}}
												onClick={addInputField}>
													Add Member
												</Button>
											)}
										</div>
									</div>
								))}
							</form>
						</div>
					</p>
				</div>
				<div className="footer">
					<button
						onClick={() => {
							setOpenModal(false);
						}}
						id="cancelBtn"
					>
						Cancel
					</button>
					<button type="submit" onClick={handleSubmit}>
						Add
					</button>
				</div>
			</div>
		</div>
	);
}

export default Add_new_Group;
export { members };
