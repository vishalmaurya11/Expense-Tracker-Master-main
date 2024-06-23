import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
	{
		title: "Home",
		path: "/Select",
		icon: <AiIcons.AiFillHome />,
		cName: "nav-text",
	},
	{
		title: "Groups",
		path: "/GroupList",
		icon: <IoIcons.IoMdPeople />,
		cName: "nav-text",
	},
	{
		title: "Individual",
		path: "/Individual",
		icon: <IoIcons.IoIosPaper />,
		cName: "nav-text",
	},
];
