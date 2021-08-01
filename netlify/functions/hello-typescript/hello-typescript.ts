import { HandlerContext, HandlerEvent } from "@netlify/functions"

type Pizza = {
	type: "pizza"
	sauce: "red" | "white"
}

type HotDog = {
	type: "hotdog"
	size: "ball park" | "footlong"
}

type Taco = {
	type: "taco"
	spiceLevel: "none" | "mild" | "hot"
}

type Sandwich = Pizza | HotDog | Taco

function serveSandwich(sandwich: Sandwich) {
	switch (sandwich.type) {
		case "pizza":
			return `Pizza with ${sandwich.sauce} sauce`
		case "hotdog":
			return `Hotdog with ${sandwich.size} size`
		case "taco":
			return `Taco with ${sandwich.spiceLevel} spice`
		default:
			throw new Error("This should never happen.")
	}
}

const handler = async (event: HandlerEvent, context: HandlerContext) => {
	try {
		const type = event?.queryStringParameters?.name || "pizza"

		const pizza: Pizza = {
			type: "pizza",
			sauce: "red",
		}

		const hotdog: HotDog = {
			type: "hotdog",
			size: "ball park",
		}

		const taco: Taco = {
			type: "taco",
			spiceLevel: "mild",
		}

		const sandwich = (sandwich: Sandwich) => {
			switch (sandwich.type) {
				case "pizza":
					return pizza
				case "hotdog":
					return hotdog
				case "taco":
					return taco
				default:
					throw new Error("This should never happen.")
			}
		}

		return {
			statusCode: 200,
			body: JSON.stringify({ message: `Hello ${sandwich}` }),
		}
	} catch (error) {
		return { statusCode: 500, body: error.toString() }
	}
}

export { handler }
