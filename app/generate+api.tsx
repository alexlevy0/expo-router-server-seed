import { ExpoRequest, ExpoResponse } from "expo-router/server";

export async function GET(req: ExpoRequest): Promise<ExpoResponse> {
	return ExpoResponse.json({ message: "Hello, world" });
}

export async function POST(req: ExpoRequest): Promise<ExpoResponse> {
	const { prompt } = await req.json();
	console.log("prompt:", prompt);

	const payload = {
		prompt,
		max_tokens: 100, // You can customize this
	};

	const json = await fetch(
		"https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions",
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${
					process.env.OPENAI_API_KEY ?? ""
				}`,
			},
			method: "POST",
			body: JSON.stringify(payload),
		}
	).then((res) => res.json());

	console.log(JSON.stringify(json, null, 2));
	return ExpoResponse.json(json);
}
