//
//  at_start.js
//  Pods
//
//  Created by Innei on 2025/2/6.
//
;(() => {
  window.__RN__ = true

  function send(data) {
    window.webkit.messageHandlers.message.postMessage?.(JSON.stringify(data))
  }

  window.bridge = {
    measure: () => {
      send({
        type: "measure",
      })
    },
    setContentHeight: (height) => {
      send({
        type: "setContentHeight",
        payload: height,
      })
    },
    previewImage: (base64) => {
      send({
        type: "previewImage",
        payload: base64,
      })
    },
  }
})()
