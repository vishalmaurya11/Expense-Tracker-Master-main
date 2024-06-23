import React from "react";
import "../componentsStyles/individual_card.css";

export default function Individual_card(props) {
	const { remarks, type, amount, date } = props;
	return (
		<div className="card-body">
			<div className="card detail-card">
				<div className="card-body">
					<div className="row detail-head">
						<h4 className="col-md-10"> {type}</h4>
						<div className="col-md-2 d-flex justify-content-end">
							{amount} INR
						</div>
					</div>
					<div className="row mt-2 detail-foot ">
						<h6 className="col-md-10">{remarks}</h6>
						<h6 className="col-md-2 d-flex justify-content-end">
							{date}
						</h6>
					</div>
				</div>
			</div>
		</div>
	);
}
