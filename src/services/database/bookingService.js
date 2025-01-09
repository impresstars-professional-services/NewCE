import { BaseService } from './baseService'
import { supabase } from './supabaseClient'

export class BookingService extends BaseService {
  constructor() {
    super('bookings')
  }

  async getByUserId(userId) {
    return this.executeQuery(async () => {
      const { data, error } = await supabase
        .from(this.tableName)
        .select(`
          *,
          address:addresses(id, street, city, state, zipCode),
          vehicle:vehicles(id, make, model, year)
        `)
        .eq('user_id', userId)
        .order('date', { ascending: true })

      if (error) throw error
      return data || []
    })
  }

  async create(bookingData) {
    return this.executeQuery(async () => {
      const { data, error } = await supabase
        .from(this.tableName)
        .insert(bookingData)
        .select()
        .single()

      if (error) throw error
      return data
    })
  }

  async update(id, bookingData) {
    return this.executeQuery(async () => {
      const { data, error } = await supabase
        .from(this.tableName)
        .update(bookingData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      if (!data) throw new Error('Booking not found')
      return data
    })
  }
}

export const bookingService = new BookingService()