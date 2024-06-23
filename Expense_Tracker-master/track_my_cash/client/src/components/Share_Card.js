import React from "react";

const Share_Card = ({ content }) => {
	return (
		<div className="row">
			<div className="col-md-12">
				<div className="card detail-card">
					<div className="card-body">
						<div className="row detail-head">
							<div className="col-md-10 col-6">
								{content.fname + " " + content.lname}
							</div>
							<div
								className={
									parseFloat(content.amount_due) >= 0
										? "col-md-2 col-6 d-flex justify-content-end text-success"
										: " col-md-2 col-6 d-flex justify-content-end text-danger"
								}
							>
								{content.amount_due > 0 ? "+" : ""}
								{content.amount_due}
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <div className="col-md-1 border"></div> */}
		</div>
	);
};

export default Share_Card;
