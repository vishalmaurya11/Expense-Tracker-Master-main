import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import FloatingSidebar from "./Floating_Sidebar";
import "../componentsStyles/group_dashboard.css";
import ExpenseCard from "./Expense_Card";
import members from "./tempMembers";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
// import members from "./Add_Group_expense";

const cookies = new Cookies();
const GroupDashBoard = () => {
	const [membersArr, setmembersArr] = useState(members);
	const [mems, setmems] = useState([]);
	const onChangeState = (newState) => {
		setmembersArr(newState);
		// console.log(membersArr);
	};
	let group_id = useParams();
	useEffect(() => {
		const fetchExpenses = async (e) => {
			await axios
				.get("https://trackmycash.onrender.com/groups/" + group_id.id)
				.then((res) => {
					setmembersArr(res.data);
				});
		};
		fetchExpenses();

		const fetchMembers = async (e) => {
			await axios
				.get("https://trackmycash.onrender.com/groups/members/" + group_id.id)
				.then((res) => {
					setmems(res.data);
				});
		};
		fetchMembers();
	}, []);

	return (
		<React.Fragment>
			<div>
				<div className="page1">
				<Sidebar />
				<FloatingSidebar
					membersProps={mems}
					logo={{ flag: true }}
					state={membersArr}
					setState={onChangeState}
					group_id={group_id.id}
				/>

				<div className="container mt-4">
					<div className="card">
						<div className="card-header">Featured</div>
						<div className="card-body">
							<div className="row">
								<div className="col-md-12">
									{membersArr.map((member) => {
										return <ExpenseCard content={member} />;
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div></div>
		</React.Fragment>
	);
};

export default GroupDashBoard;
export { members };
