import { BaseService } from './baseService'
import { supabase } from './supabaseClient'

export class UserService extends BaseService {
  constructor() {
    super('users')
  }

  async getById(id) {
    return this.executeQuery(async () => {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      if (!data) throw new Error('User not found')
      
      return data
    })
  }

  async update(id, userData) {
    return this.executeQuery(async () => {
      const { data, error } = await supabase
        .from(this.tableName)
        .update(userData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      if (!data) throw new Error('User not found')
      
      return data
    })
  }
}

export const userService = new UserService()