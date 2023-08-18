import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Swagger options
const options = {
  definition: {
    openapi: '3.0.0', // Specify OpenAPI version
    info: {
      title: 'Your API Documentation', // Specify your API title
      version: '1.0.0', // Specify API version
    },
  },
  apis: ['./routes/*.js'], // Specify the path to your route files
};

// Create Swagger specs
const specs = swaggerJSDoc(options);

// Export the Swagger setup middleware
export default function setupSwagger(app) {
  // Add Swagger UI to your app
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}
