import "react-toastify/dist/ReactToastify.css";

import { Metadata } from "next";
import React from "react";
import { ToastContainer } from "react-toastify";

import AddPet from "@/components/AddPet";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Pets from "@/components/Pets";
import { meta } from "@/lib/constants";

export const metadata: Metadata = meta;

export default function Page(): React.JSX.Element {
	return (
		<div className="relative z-0">
			<ToastContainer />
			<div className="h-screen overflow-hidden bg-cover bg-center bg-no-repeat">
				<Navbar />
				<div className="flex flex-col space-y-10 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-violet-700 via-transparent to-transparent">
					<header className="flex h-screen items-center space-y-10 overflow-hidden">
						<div className="flex h-full w-full flex-col items-center justify-center px-5 sm:items-start sm:pl-20 md:w-3/5">
							<h1 className="text-5xl lg:text-8xl">
								Rescue a <span className="font-bold text-violet-600"> Friend </span>
							</h1>
							<p className="text-md mt-3 text-gray-500 sm:text-xl lg:text-2xl">
								Give a home to a pet in need. Adopt today.
							</p>
							<AddPet />
						</div>
						<Hero />
					</header>
				</div>
			</div>
			<Pets />
		</div>
	);
}
