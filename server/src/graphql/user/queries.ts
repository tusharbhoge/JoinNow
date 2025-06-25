import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const userQueries = {
    events: async () => {
    return await prisma.event.findMany({
      include: { attendees: true }
    });
  },

  me: async (_: any, __: any, context: any) => {
    if (!context.userId) return null;
    return await prisma.user.findUnique({ where: { email: context.userId } });
  }
};