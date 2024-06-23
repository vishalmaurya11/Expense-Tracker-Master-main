import "../componentsStyles/group_dashboard.css";
import React from "react";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";

const Group_Card = ({ content }) => {
	const navigate = useNavigate();
	let link = "/Group/" + content.group_id;
	return (
		<div className="card detail-card">
			<div className="card-body">
				<div className="row detail-head">
					<div className="col-md-10 col-6"> {content.name}</div>
					<div className="col-md-2 col-6 d-flex justify-content-end">
						By {content.owner_name}
					</div>
				</div>
				<div className="row mt-2 detail-foot ">
					<div className="col-md-10"></div>
					<div className="col-md-2 d-flex justify-content-end">
						<Button onClick={() => navigate(link)}>
							View Details
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Group_Card;
