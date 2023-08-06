import { AiOutlineMessage } from "react-icons/ai";
import { BsInfoCircleFill } from "react-icons/bs";
import { ImBlog } from "react-icons/im";
import { PiProjectorScreenChart } from "react-icons/pi";

export const navLinks = [
	{
		icon: BsInfoCircleFill,
		id: "/#about",
		title: "About",
	},
	{
		id: "/#contact",
		title: "Contact",
		icon: AiOutlineMessage,
	},
	{
		id: "/adopt",
		title: "Adopt",
		icon: PiProjectorScreenChart,
	},
	{
		id: "/#pets",
		title: "Pets",
		icon: ImBlog,
	},
];

export const Abouts = [
	{
		name: "Animania",
		logo: "https://www.globalgiving.org/pfil/21618/20180130100358_1607_Large.jpg",
		description: "Empowering stray animals with care, love, and forever homes.",
	},
	{
		name: "Adoption Platform",
		logo: "https://static.toiimg.com/thumb/imgsize-23456,msid-88550639,width-600,resizemode-4/88550639.jpg",
		description: "Connecting stray animals to safe, loving homes for a brighter future.",
	},
	{
		name: "Emergency Reports",
		logo: "https://assets.nationbuilder.com/humanesocietyvc/pages/4082/meta_images/original/Report_Abuse_Social.jpg?1648673747",
		description: "Rapidly respond to stray animal emergencies through our efficient reporting system.",
	},
	{
		name: "Location Tracking",
		logo: "https://i.imgur.com/8poUpjw.jpg",
		description: "Track and aid stray animals in real-time, ensuring their safety and rescue.",
	},
];

export const meta = {
	title: "Animania",
	metadataBase: new URL(String(process.env.NEXT_PUBLIC_BASE_URL)),
	description: "Animania is a platform that aims to empower stray animals with care, love, and forever homes.",
	keywords: ["Animals", "Adoption", "Stray", "Animal Welfare", "Animal Rights"],
	authors: [{ name: "FallenDeity" }],
	robots: {
		follow: true,
		index: false,
		nocache: true,
	},
	openGraph: {
		title: "Animania",
		description: "Animania is a platform that aims to empower stray animals with care, love, and forever homes.",
		images: "/logo.png",
		type: "website",
	},
	themeColor: "#4011ad",
};
