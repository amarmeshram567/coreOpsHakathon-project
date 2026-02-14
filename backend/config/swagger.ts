import swaggerUi from "swagger-ui-express"
import YAML from "yamljs"

const swaggerDocument = YAML.load("./swagger.yaml")

export const setupSwagger = (app: any) => {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}
