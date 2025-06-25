import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const userMutations = {
  joinEvent: async (_: any, { eventId }: { eventId: string }, context: any) => {
    const userId = context.userId; 
    const io = context.io;

    if (!userId) throw new Error("Not authenticated");

    await prisma.event.update({
      where: { id: eventId },
      data: {
        attendees: {
          connect: { email: userId }
        }
      }
    });

    const updatedEvent = await prisma.event.findUnique({
      where: { id: eventId },
      include: { attendees: true }
    });

    if (io && updatedEvent) {
      io.emit("attendeeUpdate", {
        eventId,
        attendees: updatedEvent.attendees
      });
    }

    return updatedEvent;
  }
};
