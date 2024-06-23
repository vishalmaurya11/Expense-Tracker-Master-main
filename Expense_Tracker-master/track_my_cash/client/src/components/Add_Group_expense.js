import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../componentsStyles/modal.css";
//jbyhvf
import axios from "axios";
import Cookies from "universal-cookie";
let members = [];

function Add_Group_expense({ membersProps, setOpenModal, state, setState }) {
	const cookies = new Cookies();
	const Member_Id = cookies.get("Member").mem_id;
	members = membersProps;
	const getCurrentDate = (separator = "/") => {
		let newDate = new Date();
		let date = newDate.getDate();
		let month = newDate.getMonth() + 1;
		let year = newDate.getFullYear();

		return `${year}${separator}${
			month < 10 ? `0${month}` : `${month}`
		}${separator}${date}`;
	};
	const [memberExpenses, setmemberExpenses] = useState({
		involved: [],
		fname: "nobody",
		paid_by: 0,
		remarks: "",
		amount: 0,
		date: getCurrentDate(),
		added_by: Member_Id,
	});
	const [membersArr, setMembersArr] = useState(members);
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
			setmemberExpenses({ ...memberExpenses, [name]: value });
		}
	};
	const handleNumInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		let code = value.charCodeAt(value.length - 1);
		if ((code > 47 && code < 58) || value.charAt(value.length - 1) === "") {
			setmemberExpenses({ ...memberExpenses, [name]: value });
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setmemberExpenses({ ...memberExpenses, date: getCurrentDate() });
		let newState = [...state, memberExpenses];
		let temp = membersArr.filter((member) => member.isChecked);
		memberExpenses.involved = temp;
		axios
			.post("https://trackmycash.onrender.com/groups/" + group_id, memberExpenses)
			.then((res) => {
				members = res.data;
			});
		let link = "/Group/" + group_id;

		// setState(newState);

		setOpenModal(false);
		window.location.reload();
	};
	const handleChange = (e) => {
		const { name, checked } = e.target;
		let temp = membersArr.map((member) =>
			member.mem_id === name ? { ...member, isChecked: checked } : member
		);
		setMembersArr(temp);
	};
	const handleDropdown = (e) => {
		const { value } = e.target;
		let name = "";
		memberExpenses.paid_by = value;
		membersArr.forEach((member) => {
			if (member.mem_id == value) {
				name = member.fname;
			}
		});
		memberExpenses.fname = name;
	};
	let group_id = useParams().id;

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
					<h1>Add New Group Expense</h1>
				</div>
				<div className="body">
					<p>
						<div className="card">
							<form action="">
								<select
									class="custom-select mr-sm-2 form-select form-select-lg mb-3"
									id="inlineFormCustomSelect"
									required
									onChange={handleDropdown}
								>
									<option selected>Paid By </option>
									{membersArr.map((member) => (
										<option
											value={member.mem_id}
											name={member.fname}
										>
											{member.fname + " " + member.lname}
										</option>
									))}
								</select>
								{membersArr.map((member) => (
									<div
										className="form-check"
										key={member.mem_id}
									>
										<input
											type="checkbox"
											className="form-check-input"
											name={member.mem_id}
											checked={member?.isChecked || false}
											onChange={handleChange}
										/>
										<label className="form-check-label ms-2">
											{member.fname + " " + member.lname}
										</label>
									</div>
								))}
								<input
									type="text"
									class="form-control"
									name="remarks"
									value={memberExpenses.remarks}
									onChange={handleAlphaInput}
									placeholder="Expense Type"
								/>
								<input
									type="text"
									class="form-control"
									name="amount"
									value={memberExpenses.amount}
									onChange={handleNumInput}
									placeholder="Amount"
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

export default Add_Group_expense;
export { members };
