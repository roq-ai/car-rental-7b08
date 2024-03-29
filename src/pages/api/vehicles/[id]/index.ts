import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware, notificationHandlerMiddleware } from 'server/middlewares';
import { vehicleValidationSchema } from 'validationSchema/vehicles';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.vehicle
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getVehicleById();
    case 'PUT':
      return updateVehicleById();
    case 'DELETE':
      return deleteVehicleById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getVehicleById() {
    const data = await prisma.vehicle.findFirst(convertQueryToPrismaUtil(req.query, 'vehicle'));
    return res.status(200).json(data);
  }

  async function updateVehicleById() {
    await vehicleValidationSchema.validate(req.body);
    const data = await prisma.vehicle.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
  async function deleteVehicleById() {
    await notificationHandlerMiddleware(req, req.query.id as string);
    const data = await prisma.vehicle.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
