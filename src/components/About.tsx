"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

import { Abouts } from "@/lib/constants";
import { fadeIn, textVariant } from "@/lib/motion";

import StarWrapper from "./wrappers/SectionWrapper";

const ServiceCard = ({
	index,
	name,
	logo,
	description,
}: {
	index: number;
	name: string;
	logo: string;
	description: string;
}): React.JSX.Element => (
	<div className="w-full xs:w-[250px]">
		<motion.div
			initial="hidden"
			whileInView="show"
			viewport={{ once: true }}
			variants={fadeIn("right", "spring", index * 0.5, 0.75)}
			className="violet-gradient w-full rounded-lg p-[1px] shadow-xl dark:shadow-gray-800">
			<div className="flex min-h-[350px] flex-col rounded-md bg-[#eceaf9] dark:bg-[#151030]">
				<Image
					unoptimized
					src={logo}
					alt="web-development"
					className="h-[200px] w-full rounded-t-lg object-cover"
					width={64}
					height={64}
				/>
				<h2 className="mt-4 text-center text-xl font-bold">{name}</h2>
				<p className="px-4 py-4 text-left text-xs leading-5">{description}</p>
			</div>
		</motion.div>
	</div>
);

export function About(): React.JSX.Element {
	return (
		<div className="px-4 sm:px-16">
			<motion.div variants={textVariant(undefined)} initial="hidden" whileInView="show" viewport={{ once: true }}>
				<p className="ml-1 text-[14px] uppercase tracking-wider sm:text-[18px]">Introduction</p>
				<h2 className="text-[30px] xs:text-[40px] sm:text-[50px] md:text-[60px]">Overview</h2>
			</motion.div>
			<motion.p
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}
				variants={fadeIn("", "", 0.1, 1)}
				className="mt-4 max-w-3xl text-[17px] leading-[30px]">
				Animania's mission is to give stray animals a fresh start by providing a safe and caring environment,
				finding them loving forever homes. Our platform aims to raise awareness about animal welfare and promote
				responsible pet ownership in our community, envisioning a world where no stray animal is left uncared
				for.
			</motion.p>
			<div className="mt-20 flex flex-wrap items-center justify-center gap-10">
				{Abouts.map((service, index) => (
					<ServiceCard key={service.name} index={index} {...service} />
				))}
			</div>
		</div>
	);
}

export default StarWrapper(About, "about");
