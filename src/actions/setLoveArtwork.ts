"use server";
import db from "@/lib/prisma";

/**
 * get user information from user email
 * check if the user already loves artwork by artwork id
 * if the user is loved remove the love and if not add love
 * @export
 * @param {string} artworkId
 * @param {string} userEmail
 * @return {boolean} loved
 * @return {number}  totalLoves
 */
export default async function setLoveArtwork(
  artworkId: string,
  userEmail: string
) {
  // get user info
  const user = await db.user.findUnique({ where: { email: userEmail } });
  if (!user) throw new Error("User not found");

  // check if user already loves the artwork
  const artwork = await db.artwork.findUnique({
    where: { id: artworkId },
    include: { lovedBy: { where: { id: user.id } } },
  });
  if (!artwork) throw new Error("Artwork not found");

  const alreadyLoved = artwork.lovedBy.length > 0;

  if (alreadyLoved) {
    // remove love
    await db.artwork.update({
      where: { id: artworkId },
      data: {
        lovedBy: { disconnect: { id: user.id } },
        loves: { decrement: 1 },
      },
    });
  } else {
    // add love
    await db.artwork.update({
      where: { id: artworkId },
      data: { lovedBy: { connect: { id: user.id } }, loves: { increment: 1 } },
    });
  }

  // get updated love count

  const updated = await db.artwork.findUnique({
    where: { id: artworkId },
  });

  return {
    loved: !alreadyLoved,
    totalLoves: updated?.loves,
  };
}
