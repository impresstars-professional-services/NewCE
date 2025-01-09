```javascript
/**
 * Real-time notification service using WebSocket
 */
export class NotificationRealtimeService {
  constructor() {
    this.ws = null
    this.reconnectAttempts = 0
    this.maxReconnectAttempts = 5
    this.handlers = new Map()
  }

  connect(userId) {
    const wsUrl = `${import.meta.env.VITE_WS_URL}/notifications/${userId}`
    
    this.ws = new WebSocket(wsUrl)
    
    this.ws.onmessage = (event) => {
      try {
        const notification = JSON.parse(event.data)
        this.handlers.forEach(handler => handler(notification))
      } catch (error) {
        console.error('Error processing notification:', error)
      }
    }

    this.ws.onclose = () => {
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        setTimeout(() => {
          this.reconnectAttempts++
          this.connect(userId)
        }, 1000 * Math.pow(2, this.reconnectAttempts))
      }
    }
  }

  subscribe(handler) {
    const handlerId = Date.now()
    this.handlers.set(handlerId, handler)
    return () => this.handlers.delete(handlerId)
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    this.handlers.clear()
    this.reconnectAttempts = 0
  }
}

export const notificationRealtime = new NotificationRealtimeService()
```