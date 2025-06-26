import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const userMutations = {
  joinEvent: async (_: any, { eventId }: { eventId: string }, context: any) => {
    const userId = context.userId;
    const io = context.io;

    if (!userId) throw new Error("Not authenticated");

    // Confirm both user and event exist
    const user = await prisma.user.findUnique({ where: { email: userId } });
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (user) console.log(user)
    if (event) console.log(event)
    if (!user) throw new Error("User not found");
    if (!event) throw new Error("Event not found");

    // Perform the join
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
