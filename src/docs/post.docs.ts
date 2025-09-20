/**
 * @openapi
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 6510e7a2d1f6a2c9c1234567
 *         title:
 *           type: string
 *           example: My first post
 *         content:
 *           type: string
 *           example: This is the content of the post.
 *         author:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *           example:
 *             _id: 650f1c4e9b0d8e1234567890
 *             name: John Doe
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @openapi
 * /api/v1/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title: { type: string, example: My first post }
 *               content: { type: string, example: This is the content of the post. }
 *     responses:
 *       201:
 *         description: Post created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         $ref: '#/components/responses/ServerError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *
 * /api/v1/posts/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: MongoDB ObjectId of the post
 *       schema:
 *         type: string
 *         example: 6510e7a2d1f6a2c9c1234567
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Post found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               content: { type: string }
 *     responses:
 *       200:
 *         description: Post updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Post deleted
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
