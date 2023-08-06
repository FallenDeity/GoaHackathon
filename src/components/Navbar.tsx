"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import React from "react";
import { HiMenu } from "react-icons/hi";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navLinks } from "@/lib/constants";

import ThemeToggleButton from "./ThemeToggle";

export default function Navbar(): React.JSX.Element {
	const { systemTheme, theme, setTheme } = useTheme();
	const currentTheme = theme === "system" ? systemTheme : theme;
	const isDark = currentTheme === "dark";
	const router = useRouter();
	const [active, setActive] = React.useState<string>("");
	const navBarRef = React.useRef<HTMLDivElement>(null);
	React.useEffect(() => {
		const handleScroll = (): void => {
			if (navBarRef.current) {
				if (window.scrollY > 0) {
					navBarRef.current.classList.remove("bg-inherit");
					navBarRef.current.classList.add("backdrop-blur-sm");
				} else {
					navBarRef.current.classList.remove("backdrop-blur-sm");
					navBarRef.current.classList.add("bg-inherit");
				}
			}
		};
		window.addEventListener("scroll", handleScroll);
		return (): void => window.removeEventListener("scroll", handleScroll);
	}, []);
	return (
		<nav
			className={`fixed top-0 z-20 flex w-full items-center bg-inherit px-5 py-5 backdrop-filter transition-all duration-300 ease-in`}
			ref={navBarRef}>
			<div className="mx-auto flex w-full items-center justify-between">
				<div
					className="flex cursor-pointer items-center"
					onClick={(): void => {
						setActive("");
						router.push("/");
						window.scrollTo(0, 0);
					}}>
					<Image
						src={"/logo.png"}
						width={50}
						height={50}
						alt="Logo"
						className="mr-3 h-12 w-12 object-contain"
					/>
					<p className="flex items-center text-2xl font-bold">ANIMANIA</p>
				</div>
				<ul className="hidden list-none flex-row items-center justify-center gap-10 md:flex">
					{navLinks.map((link) => (
						<li key={link.title}>
							<div>
								<p
									className={`cursor-pointer ${
										active === link.title ? "text-opacity-100" : "text-opacity-50"
									} text-md hoer:text-opacity-100 cursor-pointer font-medium transition duration-300 ease-in-out`}
									onClick={(): void => {
										setActive(link.title);
										router.push(link.id);
									}}>
									{link.title}
								</p>
							</div>
						</li>
					))}
					<ThemeToggleButton />
				</ul>
				<div className="flex items-center md:hidden">
					<DropdownMenu>
						<DropdownMenuTrigger className="focus:outline-none">
							<HiMenu
								className="cursor-pointer text-3xl"
								onClick={(): void => setActive(active === "" ? "active" : "")}
							/>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="mr-3 md:hidden">
							<DropdownMenuGroup>
								{navLinks.map((link) => (
									<DropdownMenuItem key={link.title}>
										{link.title}
										<DropdownMenuShortcut>
											<link.icon size={15} />
										</DropdownMenuShortcut>
									</DropdownMenuItem>
								))}
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem onClick={(): void => setTheme(isDark ? "light" : "dark")}>
									{isDark ? "Light" : "Dark"}
									<DropdownMenuShortcut>
										{isDark ? <RiSunFill size={15} /> : <RiMoonClearFill size={15} />}
									</DropdownMenuShortcut>
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</nav>
	);
}
