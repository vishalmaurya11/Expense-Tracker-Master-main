import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import FloatingSidebar from "./Floating_Sidebar";
import "../componentsStyles/group_dashboard.css";
import ExpenseCard from "./Expense_Card";
import members from "./tempMembers";
import { useParams } from "react-router-dom";
import AddIndividualExpense from "./Add_Individual_expense";
import axios from "axios";
import Cookies from "universal-cookie";
import Update_salary from "./update_salary";
import Add_Individual_expense from "./Add_Individual_expense";
import Individual_card from "./Individual_card";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Pie_individual from "./Pie_individual";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";


ChartJS.register(ArcElement, Tooltip, Legend);

const cookies = new Cookies();
const Expenses = [];
const IndividualDashBoard = () => {
	const Mem_Id = cookies.get("Member").mem_id;
	const [member, setMember] = useState({}); //fname lname salary
	const [membersExpenses, setmembersExpenses] = useState([]);
	const [overall_expense, setoverall_expense] = useState(0);
	const [salary, setsalary] = useState(member.salary);
	const [types, settypes] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [sector_name, set_sector_name] = useState([]);
	const [sector_amount, set_sector_amount] = useState([]);
	const [groups_name, set_groups_name] = useState([]);
	const [groups_amount, set_groups_amount] = useState([]);

	const fetchgroupDues = async (e) => {
		await axios
			.get("https://trackmycash.onrender.com/member/allgroupexpenses/" + Mem_Id)
			.then((res) => {
				const response = res.data;
				console.log(response);
				const t1 = [];
				const t2 = [];
				for (var i = 0; i < response.length; i++) {
					t1.push(response[i].name);
					t2.push(response[i].sum);
				}
				set_groups_name(t1);
				set_groups_amount(t2);
				console.log(t2);
			});
	};

	const fetchMember = async (e) => {
		await axios
			.get("https://trackmycash.onrender.com/member/id/" + Mem_Id)
			.then((res) => {
				setMember(res.data);
				setsalary(res.data.salary);
			});
	};
	const fetchTypes = async (e) => {
		await axios.get("https://trackmycash.onrender.com/member/types").then((res) => {
			settypes(res.data);
		});
	};

	const updatesector_wise = () => {
		const temp = {};
		for (var i = 0; i < types.length; i++) {
			const key = types[i].type;
			temp[key] = 0;
		}

		for (var i = 0; i < membersExpenses.length; i++) {
			const ele_type = membersExpenses[i].type;
			const ele_amount = membersExpenses[i].amount;
			temp[ele_type] = temp[ele_type] + parseInt(ele_amount);
		}

		set_sector_name(Object.keys(temp));
		set_sector_amount(Object.values(temp));
	};

	const fetchexpenses = async () => {
		await axios
			.get("https://trackmycash.onrender.com/member/expenses/" + Mem_Id)
			.then((res) => {
				setmembersExpenses(res.data);
			});
	};

	const settotexpense = () => {
		let temp = 0;
		for (let i = 0; i < membersExpenses.length; i++) {
			temp = temp + parseInt(membersExpenses[i].amount);
		}
		setoverall_expense(temp);
	};
	useEffect(() => {
		fetchTypes();
		fetchMember();
		fetchexpenses();
		fetchgroupDues();
	}, []);

	useEffect(() => {
		settotexpense();
		updatesector_wise();
	}, [membersExpenses]);


	return (
		<React.Fragment>
			<div>
				<div className="page1">
				<Sidebar />

				{modalOpen && (
					<AddIndividualExpense
						setModalOpen={setModalOpen}
						types={types}
					/>
				)}

				<div className="container mt-4">
					<div className="card ">
						{/* <div className="card-header">Featured</div> */}
						<div className="card-body">
							<div className="row">
								<div className="col-md-12">
									<div className="card detail-card">
										<div className="card-body">
											<div className="row detail-head">
												<h3 className="col-md-10">
													{member.fname +
														" " +
														member.lname}
												</h3>
												{console.log(types)}
											</div>
											<div className="row detail-head">
												<div className="col-md-8">
													{" "}
													<h5>Salary : {salary}</h5>
													<div>
														<Update_salary
															Mem_Id={Mem_Id}
															setsalary={
																setsalary
															}
														/>
													</div>
													<h6 className="mt-5">
														Savings:{" "}
														{salary -
															overall_expense}
														.00
													</h6>
												</div>

												<div className="col-md-4 d-flex justify-content-end">
													<h5>
														Total Expense:{" "}
														{overall_expense}.00
													</h5>
												</div>
											</div>
										</div>
									</div>
								</div>
								{/* <div className="col-md-1 border"></div> */}
							</div>
						</div>
					</div>
					<div className="card mt-4">
						<div className="card-header">Expenses</div>
						{membersExpenses.map((ele) => (
							<Individual_card
								remarks={ele.remarks}
								type={ele.type}
								amount={ele.amount}
								date={ele.date}
							/>
						))}
					</div>

					<Pie_individual
						heading="SectorWise"
						iid={847}
						labels={sector_name}
						values={sector_amount}
					/>
					<Pie_individual
						heading="GroupWise"
						iid={454}
						labels={groups_name}
						values={groups_amount}
					/>
					{/* </div> */}
					{/* </div> */}
					<div className="child3">
					<Button
					variant ="contained"
					type="button"
					class="btn stick"
					 
					style ={{backgroundColor:"#cd817a",color:"white" }}
						onClick={() => {
							modalOpen
								? setModalOpen(false)
								: setModalOpen(true);
						}}
					>
						Add Expense
					</Button>
	  			</div>
	  {/* <div>
		<Button sx={{ backgroundColor: "black" }}>
        <Fab sx={buttonStyle} aria-label="add">
          <AddIcon />
        </Fab>
      </Button>
	  </div> */}

					{/* <button>Log Out</button> */}
				</div>
			</div>
			</div>
		</React.Fragment>
	);
};

export default IndividualDashBoard;
export { members };
