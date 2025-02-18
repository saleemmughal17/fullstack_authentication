import { PrismaClient } from "@prisma/client";
import { printTreeView } from "next/dist/build/utils";



export const prisma = new PrismaClient()
