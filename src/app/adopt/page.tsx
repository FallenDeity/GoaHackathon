import React from "react";

import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Pets from "@/components/Pets";

export default function Page(): React.JSX.Element {
	return (
		<div className="relative z-0">
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
							<a
								href="/#pets"
								className="mr-3 mt-12 inline-flex items-center justify-center rounded-lg border-2 border-indigo-600 px-5 py-3 text-center text-base font-medium shadow-lg transition-all duration-300 ease-in-out hover:scale-105">
								Adopt now
								<svg
									className="-mr-1 ml-2 h-5 w-5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fill-rule="evenodd"
										d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
										clip-rule="evenodd"></path>
								</svg>
							</a>
						</div>
						<Hero />
					</header>
				</div>
			</div>
			<Pets />
		</div>
	);
}
