import Echo from "laravel-echo"
import Pusher from "pusher-js"

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const pusherKey = runtimeConfig.public.pusherKey
  const pusherCluster = runtimeConfig.public.pusherCluster

  window.Pusher = Pusher
  var pusher = new Pusher(pusherKey, {
    cluster: pusherCluster,
    encrypted: true
  })

  pusher.connection.bind('connected', () => {
    console.log("websocket connected!");
  });
  pusher.connection.bind('error', (err) => {
    console.error("websocket error:", err);
  });

  const listen = (channel, event, callback) => {
    echo.listen(channel, event, (data) => {
      callback(data)
    })
  }
  
  const send = () => {
  }

  const echo = new Echo({
    broadcaster: 'pusher',
    key: pusherKey,
    cluster: pusherCluster,
    // forceTLS: true,
  })

  return {
    provide: {
      listen,
    }
  }


})