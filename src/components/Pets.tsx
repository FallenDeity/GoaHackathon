"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Avatar from "react-avatar";
import { BsArrowRight } from "react-icons/bs";
import { FaMapLocationDot } from "react-icons/fa6";
import Moment from "react-moment";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import usePets, { Pet } from "@/lib/hooks/usePets";
import { fadeIn, textVariant } from "@/lib/motion";

import StarWrapper from "./wrappers/SectionWrapper";

const PetCard = ({ pet, index }: { pet: Pet; index: number }): React.JSX.Element => {
	return (
		<motion.div
			variants={fadeIn("up", "spring", index * 0.25, 0.75)}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true }}>
			<div className="w-72 cursor-pointer rounded-xl bg-[#eceaf9] shadow-xl duration-500 hover:scale-105 hover:shadow-xl dark:bg-[#151030] dark:shadow-gray-800">
				<div>
					<Image
						unoptimized
						width={100}
						height={100}
						src={pet.image}
						alt="PET"
						className="h-80 w-72 rounded-t-xl object-cover"
					/>
					<div className="w-72 space-y-3 px-4 pb-1 pt-3">
						<span className="mr-3 text-xs uppercase text-neutral-500 dark:text-neutral-300">
							<Moment fromNow>{pet._createdAt}</Moment>
						</span>
						<p className="flex w-full flex-row truncate text-lg font-bold capitalize">
							<Avatar name={pet.name} size="30" className="mr-3 rounded-full text-xs" />
							{pet.name}
						</p>
						<span className="my-1 line-clamp-3 text-sm">{pet.description}</span>
						<div className="flex items-center border-t text-neutral-600 dark:border-gray-700 dark:text-neutral-200">
							<p className="my-3 cursor-auto">
								{pet.tags.slice(0, 3).map((tag, index) => (
									<span
										key={index}
										className={`mr-2 text-xs text-[${tag.color}]`}
										style={{ color: tag.color }}>
										#{tag.tag}
									</span>
								))}
							</p>
							<div className="ml-auto">
								<Dialog>
									<DialogTrigger>
										<FaMapLocationDot className="h-6 w-6" />
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Location</DialogTitle>
											<DialogDescription className="py-5">
												<iframe
													loading="lazy"
													className="h-[350px] w-full object-cover"
													src={pet.marker}
												/>
											</DialogDescription>
										</DialogHeader>
									</DialogContent>
								</Dialog>
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

const Pets = (): React.JSX.Element => {
	const router = useRouter();
	const allPets = usePets();
	const pathname = usePathname();
	const [pets, setPets] = React.useState<Pet[]>([]);
	React.useEffect(() => {
		if (pathname.includes("/adopt")) {
			setPets(allPets);
		} else {
			const randomPets = allPets.sort(() => Math.random() - Math.random()).slice(0, 3);
			setPets(randomPets);
		}
	}, [pathname, allPets]);
	return (
		<div className="px-4 sm:px-16">
			<motion.div
				variants={textVariant()}
				className="flex w-full flex-row justify-between"
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}>
				<div>
					<p className="ml-1 text-[14px] uppercase tracking-wider sm:text-[18px]">ADOPT THEM</p>
					<h2 className="text-[30px] xs:text-[40px] sm:text-[50px] md:text-[60px]">Pets</h2>
				</div>
				{!pathname.includes("/adopt") && (
					<button
						onClick={(): void => router.push("/adopt")}
						className="hidden h-fit flex-row items-center justify-center rounded-md px-5 py-2 font-bold transition-all duration-300 ease-in-out sm:flex">
						VIEW MORE
						<BsArrowRight className="ml-2 text-[20px]" />
					</button>
				)}
			</motion.div>
			<div className="flex w-full">
				<motion.p
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					variants={fadeIn("", "", 0.1, 0.25)}
					className="mt-3 max-w-3xl text-[14px] leading-[30px] sm:text-[17px]">
					Adopting a pet is an amazing way to show love to an animal in need and brings so much love to you in
					return. Here are some of the pets that are looking for a home. You can also visit the shelter to see
					more pets.
				</motion.p>
			</div>
			<div className="mt-20 flex h-full w-full flex-wrap items-center justify-center gap-10">
				{pets.map((pet, index) => (
					<PetCard key={`project-${index}`} index={index} pet={pet} />
				))}
			</div>
		</div>
	);
};

export default StarWrapper(Pets, "Pets");
