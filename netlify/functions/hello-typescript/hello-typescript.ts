import { HandlerEvent } from "@netlify/functions"

const handler = async (event: HandlerEvent) => {
	try {
		const subject = event?.queryStringParameters?.name || "🦃"
		return {
			statusCode: 200,
			body: JSON.stringify({ message: `Hello ${subject}` }),
		}
	} catch (error) {
		return { statusCode: 500, body: error.toString() }
	}
}

export { handler }
