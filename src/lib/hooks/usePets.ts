"use client";

import React from "react";

import { sanityClient } from "../sanity.client";

export interface Pet {
	_id: string;
	name: string;
	image: string;
	description: string;
	marker: string;
	tags: {
		tag: string;
		color: string;
	}[];
	_createdAt: Date;
}

export default function usePets(): Pet[] {
	const [pets, setPets] = React.useState<Pet[]>([]);
	React.useEffect(() => {
		async function fetchPets(): Promise<void> {
			const query = '*[_type == "pet"]';
			const pet = await sanityClient.fetch<Pet[]>(query);
			setPets(pet);
		}
		void fetchPets();
		const subscription = sanityClient.listen("*[_type == 'pet']").subscribe((record) => {
			if (record.transition === "appear") {
				try {
					const pet = record.result as unknown as Pet;
					setPets((pets) => [...pets, pet]);
				} catch (error) {
					console.log(error);
				}
			}
			if (record.transition === "disappear") {
				setPets((pets) => pets.filter((p) => p._id !== record.documentId));
			}
		});
		return () => subscription.unsubscribe();
	}, []);
	return pets;
}
