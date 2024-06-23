import "../componentsStyles/group_dashboard.css";
import React from "react";

const Expense_Card = ({ content }) => {
	return (
		<div className="card detail-card">
			<div className="card-body">
				<div className="row detail-head">
					<div className="col-md-10 col-6"> {content.fname}</div>
					<div className="col-md-2 col-6 d-flex justify-content-end">
						{content.amount} INR
					</div>
				</div>
				<div className="row mt-2 detail-foot ">
					<div className="col-md-10 col-6"> {content.remarks}</div>
					<div className="col-md-2 col-6 d-flex justify-content-end">
						{content.date}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Expense_Card;
