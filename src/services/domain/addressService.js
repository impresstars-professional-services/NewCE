import { BaseService } from './baseService'
import { apiService } from '../api'
import { validateAddress } from '../../utils/validators'
import { createError } from '../../utils/errorHandler'

class AddressService extends BaseService {
  constructor() {
    super('Address')
  }

  async getAddresses(userId) {
    return this.executeServiceCall('getAddresses', async () => {
      const result = await apiService.getUserData(userId)
      return result.success ? result.data.addresses : []
    })
  }

  async saveAddress(userId, addressData) {
    return this.executeServiceCall('saveAddress', async () => {
      if (!validateAddress(addressData)) {
        throw createError('Invalid address data', 'VALIDATION_ERROR')
      }
      return await apiService.saveAddress(userId, addressData)
    })
  }

  async deleteAddress(userId, addressId) {
    return this.executeServiceCall('deleteAddress', async () => {
      return await apiService.deleteAddress(userId, addressId)
    })
  }
}

export const addressService = new AddressService()