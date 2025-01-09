import { BaseService } from './baseService'
import { supabase } from './supabaseClient'

export class VehicleService extends BaseService {
  constructor() {
    super('vehicles')
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

  async create(vehicleData) {
    return this.executeQuery(async () => {
      const { data, error } = await supabase
        .from(this.tableName)
        .insert(vehicleData)
        .select()
        .single()

      if (error) throw error
      return data
    })
  }

  async update(id, vehicleData) {
    return this.executeQuery(async () => {
      const { data, error } = await supabase
        .from(this.tableName)
        .update(vehicleData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      if (!data) throw new Error('Vehicle not found')
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

export const vehicleService = new VehicleService()