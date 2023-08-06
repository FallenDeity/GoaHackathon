"use client";

import "react-toastify/dist/ReactToastify.css";

import { useTheme } from "next-themes";
import React from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AddPet(): React.JSX.Element {
	const [loading, setLoading] = React.useState(false);
	const { systemTheme, theme } = useTheme();
	const currentTheme = theme === "system" ? systemTheme : theme;
	const isDark = currentTheme === "dark";
	const formRef = React.useRef<HTMLFormElement>(null);
	const [form, setForm] = React.useState({
		name: "",
		description: "",
		image: "",
		tag: "",
		marker: "",
	});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
		const { target } = e;
		const { name, value } = target;

		setForm({
			...form,
			[name]: value,
		});
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		setLoading(true);
		const randomHexColor = Math.floor(Math.random() * 16777215).toString(16);
		const { name, description, image, tag, marker } = form;
		const data = {
			name,
			description,
			image,
			tags: [{ tag, color: `#${randomHexColor}` }],
			marker,
		};
		if (!name || !description || !image || !tag || !marker) {
			setLoading(false);
			toast.error("Please fill all fields!", {
				position: "bottom-right",
				theme: isDark ? "dark" : "light",
			});
			return;
		}
		// verify image url
		const img = new Image();
		img.src = image;
		img.onload = (): void => {
			if (img.width === 0 || img.height === 0) {
				setLoading(false);
				toast.error("Invalid image url!", {
					position: "bottom-right",
					theme: isDark ? "dark" : "light",
				});
			}
		};
		const Reg = /^https:\/\/www\.google\.com\/maps\/embed\?pb=[!-~]*$/;
		if (!Reg.test(marker)) {
			setLoading(false);
			toast.error("Invalid marker url! Give an embed url!", {
				position: "bottom-right",
				theme: isDark ? "dark" : "light",
			});
			return;
		}
		try {
			await fetch("/api/pets", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			setLoading(false);
			toast.success("Pet added successfully!", {
				position: "bottom-right",
				theme: isDark ? "dark" : "light",
			});
			formRef.current?.reset();
			setForm({
				name: "",
				description: "",
				image: "",
				tag: "",
				marker: "",
			});
		} catch (error) {
			setLoading(false);
			toast.error((error as Error).message, {
				position: "bottom-right",
				theme: isDark ? "dark" : "light",
			});
		}
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="mr-3 mt-12 inline-flex items-center justify-center rounded-lg border-2 border-indigo-600 bg-transparent px-5 py-4 text-center text-base font-medium text-black shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-transparent dark:text-white">
					Report a stray
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
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Report Stray</DialogTitle>
					<DialogDescription>Report a stray pet to help us find it a home.</DialogDescription>
				</DialogHeader>
				{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
				<form className="grid gap-4 py-4" ref={formRef} onSubmit={handleSubmit}>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input
							placeholder="Your Name"
							id="name"
							value={form.name}
							onChange={handleChange}
							name="name"
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="description" className="text-right">
							Description
						</Label>
						<Textarea
							placeholder="Description"
							id="description"
							value={form.description}
							onChange={handleChange}
							name="description"
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="image" className="text-right">
							Image
						</Label>
						<Input
							placeholder="Image URL"
							id="image"
							value={form.image}
							onChange={handleChange}
							name="image"
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="tag" className="text-right">
							Tag
						</Label>
						<Input
							placeholder="Tag"
							id="tag"
							value={form.tag}
							onChange={handleChange}
							name="tag"
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="marker" className="text-right">
							Marker
						</Label>
						<Input
							placeholder="Google Maps Marker"
							id="marker"
							value={form.marker}
							onChange={handleChange}
							name="marker"
							className="col-span-3"
						/>
					</div>
					<DialogFooter>
						<Button
							disabled={loading}
							className="disabled:cursor-not-allowed disabled:bg-opacity-50"
							type="submit">
							{loading ? <BeatLoader color="#fff" size={8} /> : "Save"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
