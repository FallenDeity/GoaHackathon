"use client";

import Lottie from "lottie-react";
import { usePathname } from "next/navigation";
import React from "react";

import animationDataAdopt from "@/assets/animation_akJuC9UOXn.json";
import animationDataHome from "@/assets/animation_lkzditra.json";

export default function Hero(): React.JSX.Element {
	const pathname = usePathname();
	return (
		<div className="hidden min-h-screen flex-col items-center justify-center py-12 sm:px-6 md:flex lg:px-8">
			{pathname.includes("adopt") ? (
				<Lottie
					animationData={animationDataAdopt}
					loop={true}
					height={500}
					width={500}
					allowTransparency={true}
				/>
			) : (
				<Lottie
					animationData={animationDataHome}
					loop={true}
					height={500}
					width={500}
					allowTransparency={true}
				/>
			)}
		</div>
	);
}
