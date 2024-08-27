import prismaClient from "./database";

async function updateTourRating(tourId: string) {
  const tour = await prismaClient.tour.update({
    where: { id: tourId },
    data: {
      rating: {
        set: (await prismaClient.review.aggregate({
          where: { tourId },
          _avg: { average: true },
        }))._avg.average || 0,
      },
    },
  });
  return tour;
}

export default updateTourRating