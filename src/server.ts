import express from "express";
import { prisma } from "../lib/prisma.ts";
import notesServiceRoutes from "./routes/notesServiceRoutes";
const app = express();
const PORT = 3000;

//Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));  
app.use("/api", notesServiceRoutes);

// async function main() {
//   // Create a new user with a post if they don't exist
//   let user = await prisma.user.findUnique({
//     where: { email: "sajjangddfhbhbf@gmail.com" }
//   });

//   if (!user) {
//     user = await prisma.user.create({
//       data: {
//         name: "Alice",
//         email: "sajjangddfhbhbf@gmail.com",
//         university: "DU",
//         course: "CS",
//         semester: "SEM5",
//       }
//     });
//     console.log("Created user:", user);
//   } else {
//     console.log("User already exists:", user);
//   }

//   // Fetch all users with their posts
//   const allUsers = await prisma.user.findMany();
//   console.log("All users:", JSON.stringify(allUsers, null, 2));
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
