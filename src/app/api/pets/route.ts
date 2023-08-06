import { faker } from "@faker-js/faker";
import { NextResponse } from "next/server";

import { sanityClient } from "@/lib/sanity.client";

interface PetParams {
	_type: string;
	name: string;
	image: string;
	description: string;
	marker: string;
	tags: {
		_key: string;
		tag: string;
		color: string;
	}[];
}

export async function POST(request: Request): Promise<NextResponse> {
	try {
		const pet = (await request.json()) as PetParams;
		pet._type = "pet";
		for (const tag of pet.tags) {
			tag._key = faker.string.uuid();
		}
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
