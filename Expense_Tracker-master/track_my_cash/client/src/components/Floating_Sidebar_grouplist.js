import React from "react";
import "../componentsStyles/floating_sidebar.css";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddNewGroup from "./Add_new_Group";
import AddNewMember from "./Add_member_to_group";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Floating_Sidebar_grouplist = ({ logo, state, setState }) => {
	const [modal1Open, setModal1Open] = useState(false);
	const [modal2Open, setModal2Open] = useState(false);

	return (
		<>
			<div>
				{modal1Open && (
					<AddNewGroup
						setOpenModal={setModal1Open}
						state={state}
						setState={setState}
					/>
				)}
				{modal2Open && (
					<AddNewMember
						setOpenModal={setModal2Open}
						state={state}
						setState={setState}
					/>
				)}
				<div id="floating-panel2">
					<div className="floating-icon">
						<InfoOutlinedIcon
							fontSize="large"
							sx={{ color: "#ffff" }}
						/>
					</div>
					{logo.flag && (
						<div className="floating-icon">
							<button
								className="openModalBtn"
								onClick={() => {
									modal1Open
										? setModal1Open(false)
										: setModal1Open(true);
								}}
							>
								<GroupAddIcon
									fontSize="large"
									sx={{ color: "#ffff" }}
								/>
							</button>
						</div>
					)}
					{logo.flag && (
						<div className="floating-icon">
							<button
								className="openModalBtn"
								onClick={() => {
									modal2Open
										? setModal2Open(false)
										: setModal2Open(true);
								}}
							>
								<PersonAddIcon
									fontSize="large"
									sx={{ color: "#ffff" }}
								/>
							</button>
						</div>
					)}

					<SettingsIcon fontSize="large" sx={{ color: "#ffff" }} />
				</div>
			</div>
		</>
	);
};

export default Floating_Sidebar_grouplist;
