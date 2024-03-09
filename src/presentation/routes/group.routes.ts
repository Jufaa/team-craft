import { Router } from 'express';
import { GroupService } from '../../infrastructure/services';
import { PrismaGroupRepository } from '../../infrastructure/repositories/prisma';

import { GroupController } from '../controllers/group.controller';
import { requireAuth } from '../middlewares';

export class GroupRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new GroupService(new PrismaGroupRepository());
    const controller = new GroupController(service);

    router.post('/', requireAuth, controller.CreateGroup.bind(controller));
    router.post('/add/:groupId', requireAuth, controller.AddMember.bind(controller));

    router.get('/', requireAuth, controller.GetGroups.bind(controller));
    router.get('/:groupId', requireAuth, controller.GetGroup.bind(controller));

    return router;
  }
}

/**
 * @swagger
 * /api/v1/groups:
 *    get:
 *        summary: Get all groups
 *        security:
 *            - bearerAuth: []
 *        tags:
 *            - Groups
 *        responses:
 *            200:
 *                description: List of groups
 *            500:
 *                description: Internal server error
 * /api/v1/groups/{id}:
 *    get:
 *        summary: Get group by id
 *        security:
 *            - bearerAuth: []
 *        tags:
 *            - Groups
 *        parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: Group id
 *              schema:
 *                  type: string
 *        responses:
 *            200:
 *                description: List of groups
 *            500:
 *                description: Internal server error
 * /api/v1/add/{id}:
 *  post:
 *      summary: Add member to group
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Groups
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Group id
 *            schema:
 *                type: string
 *      responses:
 *          200:
 *              description: Member added to group
 *          500:
 *              description: Internal server error
 */
