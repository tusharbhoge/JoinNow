import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const userQueries = {
    event: async (_: any, { id }: { id: string }) => {
    return await prisma.event.findUnique({
      where: { id },
      include: { attendees: true }
    });
  },

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