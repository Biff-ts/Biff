import type { Config } from 'drizzle-kit'

export default {
	schema: './src/db/schema.ts',
	out: './drizzle/migrations',
	driver: 'd1-http', // ← ✅ 最新の正解！

	dbCredentials: {
		accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
		databaseId: process.env.D1_DATABASE_ID!,
		token: process.env.CLOUDFLARE_API_TOKEN!
	},
	dialect: 'sqlite'
} satisfies Config
