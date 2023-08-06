import { NextResponse } from "next/server";

import { sanityClient } from "@/lib/sanity.client";

interface PetParams {
	_type: string;
	name: string;
	image: string;
	description: string;
	marker: string;
	tags: {
		tag: string;
		color: string;
	}[];
}

export async function POST(request: Request): Promise<NextResponse> {
	try {
		const pet = (await request.json()) as PetParams;
		pet._type = "pet";
		await sanityClient.create(pet);
		return new NextResponse(
			JSON.stringify({
				message: "Pet created successfully",
			}),
			{
				status: 201,
			}
		);
	} catch (error) {
		return new NextResponse(
			JSON.stringify({
				message: "Error creating pet",
				error,
			}),
			{
				status: 500,
			}
		);
	}
}
