import { BaseService } from './baseService'
import { supabase } from './supabaseClient'

export class AddressService extends BaseService {
  constructor() {
    super('addresses')
  }

  async getByUserId(userId) {
    return this.executeQuery(async () => {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    })
  }

  async create(addressData) {
    return this.executeQuery(async () => {
      const { data, error } = await supabase
        .from(this.tableName)
        .insert(addressData)
        .select()
        .single()

      if (error) throw error
      return data
    })
  }

  async update(id, addressData) {
    return this.executeQuery(async () => {
      const { data, error } = await supabase
        .from(this.tableName)
        .update(addressData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      if (!data) throw new Error('Address not found')
      return data
    })
  }

  async delete(id) {
    return this.executeQuery(async () => {
      const { error } = await supabase
        .from(this.tableName)
        .delete()
        .eq('id', id)

      if (error) throw error
      return true
    })
  }
}

export const addressService = new AddressService()