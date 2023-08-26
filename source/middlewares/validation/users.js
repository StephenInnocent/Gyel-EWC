const { z } = require("zod");

const applyForEssayVal = z.object({
    name: z.string({message: "Please provide your name"}).min(3,{message: "Names must exceed 3 characters"}),
    school: z.string({message: "Please provide your school"}),
    village: z.string({message: "Please provide your village"}),
    class: z.string({message: "Please provide your classs"}),
    email: z.string({message: "Please provide your email"}).email().includes("@",{message: "Invalid Email Address"}),
})
const createAdminVal = z.object({
    name: z.string({message: "Please provide your name"}).min(3,{message: "Names must exceed 3 characters"}),
    password: z.string({message: "Please provide your password"}),
    email: z.string({message: "Please provide your email"}).email().includes("@",{message: "Invalid Email Address"}),
})
module.exports = {
    applyForEssayVal,
    createAdminVal
}