/**@type {import("drizzle-kit").config} */

export default{
    schema:"./utils/schema.tsx",
    dialect:'postgresql',
    dbCredentials:{
        url:'postgresql://KontentAi_owner:AmuD7b8OqcQW@ep-muddy-hill-a5ergtn3.us-east-2.aws.neon.tech/KontentAi?sslmode=require'
    }
}