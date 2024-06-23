import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../componentsStyles/modal.css";

import axios from "axios";
import Cookies from "universal-cookie";

function AddIndividualExpense({ setModalOpen, types }) {
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
	const [Expense, setExpense] = useState({
		mem_id: Member_Id,
		amount: 0,
		date: getCurrentDate(),
		remarks: "",
		expense_type_id: 19,
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		setExpense({ ...Expense, date: getCurrentDate() });

		console.log(Expense);
		axios.post("https://trackmycash.onrender.com/member/addExpense", Expense);

		setModalOpen(false);
		window.location.reload();
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
			setExpense({ ...Expense, [name]: value });
		}
	};
	const handleNumInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		let code = value.charCodeAt(value.length - 1);
		if ((code > 47 && code < 58) || value.charAt(value.length - 1) === "") {
			setExpense({ ...Expense, [name]: value });
		}
	};
	const handleDropdown = (e) => {
		const { value } = e.target;
		Expense.expense_type_id = value;
	};
	return (
		<div className="modalBackground">
			<div className="modalContainer">
				<div className="titleCloseBtn">
					<button
						onClick={() => {
							setModalOpen(false);
						}}
					>
						X
					</button>
				</div>
				<div className="title">
					<h1>Add New Expense</h1>
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
									<option selected onChange={handleDropdown}>
										Category{" "}
									</option>
									{types.map((category) => (
										<option
											value={category.expense_type_id}
											name={category.type}
										>
											{category.type}
										</option>
									))}
								</select>

								<input
									type="text"
									class="form-control"
									name="remarks"
									value={Expense.remarks}
									onChange={handleAlphaInput}
									placeholder="Expense Type"
								/>
								<input
									type="text"
									class="form-control"
									name="amount"
									value={Expense.amount}
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
							setModalOpen(false);
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
export default AddIndividualExpense;
