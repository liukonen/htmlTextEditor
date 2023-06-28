// Cache the files when the service worker is installed
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('my-cache').then(function(cache) {
        return cache.addAll([
            'favicon.ico',
            'img/android-chrome-192x192.png',
            'img/android-chrome-512x512.png',
            'img/apple-touch-icon.png',
            'img/favicon-16x16.png',
            'img/favicon-32x32.png',
            'img/text128.png',
            'img/text144.png',
            'img/text152.png',
            'img/text192.png',
            'img/text384.png',
            'img/text512.png',
            'img/text72.png', 
            'img/text96.png',
            'js/vkBeautify/vkbeautify.js',
            'manifest.json',
            'js/TextApp.js',
            'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js'
          // Add more files to cache as needed
        ])
      })
    )
  })
  
  // Intercept fetch requests
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      fetch(event.request)
        .then(function(response) {
          var responseClone = response.clone()
  
          caches.open('my-cache').then(function(cache) {
            cache.put(event.request, responseClone)
          })
  
          return response
        })
        .catch(function() {
          return caches.match(event.request)
        })
    )
  })
  