/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 650f1c4e9b0d8e1234567890
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           example: johndoe@example.com
 *         role:
 *           type: string
 *           enum: [user, admin, moderator]
 *           example: user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-09-19T12:34:56Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-09-19T12:34:56Z
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT access token
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         user:
 *           $ref: '#/components/schemas/User'
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Unauthorized
 *         error:
 *           type: string
 *           example: Invalid token
 */
