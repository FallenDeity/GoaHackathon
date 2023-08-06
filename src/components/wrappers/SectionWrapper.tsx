"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { staggerContainer } from "@/lib/motion";

const StarWrapper = (Component: React.FC, idName: string): React.FC =>
	function HOC(): React.JSX.Element {
		const pathname = usePathname().replace("/", "");
		return (
			<motion.section
				variants={staggerContainer(undefined, undefined)}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.25 }}
				className="relative z-0 my-10 w-full justify-center px-5 md:px-10">
				<span className="hash-span" id={(pathname ? `${pathname}-${idName}` : idName).toLocaleLowerCase()}>
					&nbsp;
				</span>
				<Component />
			</motion.section>
		);
	};

export default StarWrapper;
