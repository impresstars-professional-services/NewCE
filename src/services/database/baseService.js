import { handleError } from '../../utils/errorHandler'

export class BaseService {
  constructor(tableName) {
    this.tableName = tableName
  }

  async executeQuery(operation, params = {}) {
    try {
      const result = await operation(params)
      return { success: true, data: result }
    } catch (error) {
      return handleError(error, `Database operation failed for ${this.tableName}`)
    }
  }
}