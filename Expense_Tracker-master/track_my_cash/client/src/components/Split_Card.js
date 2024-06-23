import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import Button from "@mui/material/Button";
const accountSid = "ACef17d4d484c5b1692e7cecdcf64cdddb";
const authToken = "dffd44ad5694699609a531d3d7a7eee3";
//let twclient = new twilio(accountSid,authToken);

function alert(content) {
	console.log(content);


	

	const message ={message: 
		"You have amount due of rupees " +
		content.val +
		"INR to " +
		content.Name1,
		p_num: content.Phone_Num2};
	const fetchContact = async (e) => {
		//console.log(content);
		await axios
			.post("https://trackmycash.onrender.com/groups/message/",(message))
			.then((res) => {
				console.log(res.data);
				//console.log(twclient.messages);

			});
	};
	fetchContact();
}

const Split_Card = ({ content }) => {
	const cookies = new Cookies();
	const Mem_Id = cookies.get("Member").mem_id;
	const group_id = useParams().id;
	const settle = (obj) => {
		async function SettleExp(obj) {
			await axios
				.post("https://trackmycash.onrender.com/groups/settle/" + group_id, obj)
				.then((res) => {
					console.log(res.data);
					window.location.reload();
				});
		}
		SettleExp(obj);
	};
	console.log(content);
	return (
		<div className="row">
			<div className="col-md-12">
				<div className="card detail-card">
					<div className="card-body">
						<div className="row detail-head">
							<div className="col-md-10 col-6">{content.Name2}</div>
							<div className="col-md-2 col-6 d-flex justify-content-end">
								{content.val} INR
							</div>
						</div>
						<div className="row mt-2 detail-foot ">
							<div className="col-md-10 col-6">
								{" "}
								Should pay to {content.Name1}
							</div>
							{console.log(Mem_Id, content.Mem_id1)}
							{Mem_Id == content.Mem_id1 && (
								<div className="col-md-2 col-6 d-flex justify-content-between">
									<Button variant ="text" onClick={() => alert(content)}>
										Alert
									</Button>
									<Button variant ="text" onClick={() => settle(content)}>
										Settled
									</Button>
								</div>
							)}
							{/* <div className="col-md-2 d-flex justify-content-end">31 Jan,2021</div> */}
						</div>
					</div>
				</div>
			</div>
			{/* <div className="col-md-1 border"></div> */}
		</div>
	);
};

export default Split_Card;
