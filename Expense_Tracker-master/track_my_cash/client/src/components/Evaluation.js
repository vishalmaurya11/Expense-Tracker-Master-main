import React, { useState, useEffect } from "react";
import PriorityQueue from "priorityqueuejs";
import Sidebar from "./Sidebar";
import axios from "axios";
import Share_Card from "./Share_Card";
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";
import Split_Card from "./Split_Card";
import "../componentsStyles/select_path.css";

const cookies = new Cookies();

let Expense_List = [];
let amount = 0;
let SplitList = [];

function Evaluation() {
	const group_id = useParams().id;
	const [Amount, setAmount] = useState(amount);
	const [Share, setShare] = useState(Expense_List);
	const [Split, setSplit] = useState(SplitList);
	let tempu = [];

	const onChangeState = (newState) => {
		setAmount(newState);
		setShare(newState);
		setSplit(newState);
	};
	const calculate = async (e) => {
		//console.log(Share);
		var Giver = new PriorityQueue(function (a, b) {
			return a.cash - b.cash;
		});
		var Taker = new PriorityQueue(function (a, b) {
			return a.cash - b.cash;
		});
		let n = Share.length;
		for (let i = 0; i < n; i++) {
			let h = Share[i].amount_due;
			console.log(Share);

			if (h > 0) {
				Taker.enq({
					Mem_id: Share[i].mem_id,
					fName: Share[i].fname,
					lName: Share[i].lname,
					cash: h,
					Phone_Num: Share[i].phone_num,
				});
			} else if (h < 0) {
				Giver.enq({
					Mem_id: Share[i].mem_id,
					fName: Share[i].fname,
					lName: Share[i].lname,
					cash: -h,
					Phone_Num: Share[i].phone_num,

				});
			}
		}

		while (Taker.size() !== 0 && Giver.size() !== 0) {
			let diff = Taker.peek().cash - Giver.peek().cash;
			console.log(Taker.size(), Giver.size());
			console.log(Taker.peek());
			console.log(Giver.peek());
			let fName1 = Taker.peek().fName;
			let lName1 = Taker.peek().lName;
			let Mem_id1 = Taker.peek().Mem_id;
			let Phone_Num1= Taker.peek().Phone_Num;

			let fName2 = Giver.peek().fName;
			let lName2 = Giver.peek().lName;
			let Mem_id2 = Giver.peek().Mem_id;
			let Phone_Num2= Giver.peek().Phone_Num;

			let val1 = Taker.peek().cash;
			let val2 = Giver.peek().cash;
			Giver.deq();
			Taker.deq();

			if (diff < 0) {
				Giver.enq({
					Mem_id: Mem_id2,
					fName: fName2,
					lName: lName2,
					cash: -diff,
					Phone_Num: Phone_Num2,

				});
				//let tem = "Person " + id2 + "--> Person " + id1 + " : " + val1;
				let temp = {
					Mem_id: Mem_id1,
					Name2: fName2 + " " + lName2,
					Name1: fName1 + " " + lName1,
					val: val1,
					Phone_Num2: Phone_Num2,
					Phone_Num1: Phone_Num1,

				};
				tempu.push(temp);
			} else if (diff > 0) {
				Taker.enq({
					Mem_id: Mem_id1,
					fName: fName1,
					lName: lName1,
					cash: diff,
					Phone_Num: Phone_Num1,

				});
				// let tem = "Person " + id2 + "--> Person " + id1 + " : " + val2;
				let temp = {
					Mem_id2: Mem_id2,
					Name2: fName2 + " " + lName2,
					Mem_id1: Mem_id1,
					Name1: fName1 + " " + lName1,
					val: val2,
					Phone_Num2: Phone_Num2,
					Phone_Num1: Phone_Num1,

				};

				tempu.push(temp);
			} else {
				// let temp = "Person " + id2 + "--> Person " + id1 + " : " + val1;
				let temp = {
					Mem_id2: Mem_id2,
					Name2: fName2 + " " + lName2,
					Mem_id1: Mem_id1,
					Name1: fName1 + " " + lName1,
					val: val1,
					Phone_Num2: Phone_Num2,
					Phone_Num1: Phone_Num1,

				};

				tempu.push(temp);
			}
			if (Taker.size() === 0) {
				console.log("hi");
				break;
			}
		}

		console.log(tempu);
	};
	calculate();

	//calculate();

	useEffect(() => {
		console.log(group_id);
		const fetchAmount = async (e) => {
			await axios
				.get("https://trackmycash.onrender.com/groups/amount/" + group_id)
				.then((res) => {
					console.log(res.data);
					setAmount(res.data.rows[0].sum);
					console.log(Amount);
				});
			await axios
				.get("https://trackmycash.onrender.com/groups/share/" + group_id)
				.then((res) => {
					//console.log(res.data);
					setShare(res.data);
					console.log(Share);
				});
		};
		fetchAmount();
	}, []);
	return (
		<React.Fragment>
			<div className="page1">
				<Sidebar />

				<div className="container mt-4">
					<div className="card">
						{/* <div className="card-header">Featured</div> */}
						<div className="card-body">
							<div className="row">
								<div className="col-md-12">
									<div className="card detail-card">
										<div className="card-body">
											<div className="row detail-head">
												<div className="col-md-10 col-6">
													{" "}
													Total Expense
												</div>
												<div className="col-md-2 col-6 d-flex justify-content-end">
													{Amount}
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
						<div className="card-header">Summary</div>
						<div className="card-body">
							{Share.map((memShare) => {
								return <Share_Card content={memShare} />;
							})}
						</div>
					</div>
					<div className="card mt-4">
						<div className="card-header">How to settle?</div>
						<div className="card-body">
							{tempu.map((memSplit) => {
								return <Split_Card content={memSplit} />;
							})}
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default Evaluation;
