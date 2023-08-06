export default {
	name: "pet",
	title: "Pet",
	type: "document",
	fields: [
		{
			name: "name",
			title: "Name",
			type: "string",
		},
		{
			name: "image",
			title: "Image",
			type: "string",
		},
		{
			name: "description",
			title: "Description",
			type: "text",
		},
		{
			name: "marker",
			title: "Marker",
			type: "string",
		},
		{
			name: "tags",
			title: "Tags",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						{
							name: "tag",
							title: "Tag",
							type: "string",
						},
						{
							name: "color",
							title: "Color",
							type: "string",
						},
					],
				},
			],
		},
	],
};
