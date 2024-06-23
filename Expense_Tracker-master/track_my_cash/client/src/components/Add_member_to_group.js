import React, { useState } from "react";
import "../componentsStyles/modal.css";

import axios from "axios";
import Cookies from "universal-cookie";

function Add_new_Mem({ setOpenModal, state, setState }) {
	const cookies = new Cookies();
	const Member_Id = cookies.get("Member").mem_id;
	const [group, setgroup] = useState({
		mem_id: Member_Id,
		group_id: 0,
		name: "",
	});
	const handleInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setgroup({ ...group, [name]: value });
	};
	const handleAlphaInput = (e) => {
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
	const handleNumInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		let code = value.charCodeAt(value.length - 1);
		if ((code > 47 && code < 58) || value.charAt(value.length - 1) === "") {
			setgroup({ ...group, [name]: value });
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setgroup({ ...group });
		console.log(group);

		axios.post("https://trackmycash.onrender.com/groups/addMem", group).then((res) => {
			if (res.data == "-1") {
				alert("This group does not exist");
			} else if (res.data == "-2") {
				alert("You are already in this group");
			} else if (res.data == "-1") {
				alert("Added member to Group");
			}
		});

		setOpenModal(false);
		window.location.reload();
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
					<h1>Add Yourself to a New Group</h1>
				</div>
				<div className="body">
					<p>
						<div className="card">
							<form action="" onSubmit={handleSubmit}>
								<input
									type="text"
									class="form-control"
									name="group_id"
									value={group.group_id}
									onChange={handleNumInput}
									placeholder="Group ID"
								/>
								<input
									type="text"
									class="form-control"
									name="name"
									value={group.name}
									onChange={handleAlphaInput}
									placeholder="Group Name"
								/>
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

export default Add_new_Mem;
