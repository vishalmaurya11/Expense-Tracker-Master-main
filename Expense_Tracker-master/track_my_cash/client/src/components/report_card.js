import "../componentsStyles/group_dashboard.css";
import React from "react";

const Report_Card = ({ content }) => {
	return (
		<div className="card detail-card">
			<div className="card-body">
				<div className="row detail-head">
					<div className="col-md-9 col-6"> {content.name}</div>
					<div className="col-md-3 col-6 d-flex justify-content-end">
						Expense: {content.sum} INR
					</div>
				</div>
				<div className="row mt-2 detail-foot ">
					<div className="col-md-10"> {content.remarks}</div>
					<div className="col-md-2 d-flex justify-content-end">
						Due: {content.amount_due} INR
					</div>
				</div>
			</div>
		</div>
	);
};

export default Report_Card;
