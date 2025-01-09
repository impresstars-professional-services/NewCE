import { handleError } from '../../utils/errorHandler'

export class BaseService {
  constructor(resourceName) {
    this.resourceName = resourceName
  }

  handleServiceError(error, operation) {
    return handleError(error, {
      context: `${this.resourceName} service ${operation}`
    })
  }

  async executeServiceCall(operation, callback) {
    try {
      return await callback()
    } catch (error) {
      return this.handleServiceError(error, operation)
    }
  }
}