import { nextFrame } from "@follow/utils/dom"
import { useAnimationControls } from "framer-motion"
import { useCallback, useEffect, useLayoutEffect } from "react"
import { useEventCallback } from "usehooks-ts"

import { modalMontionConfig } from "../constants"

/**
 * @internal
 */
export const useModalAnimate = (isTop: boolean) => {
  const animateController = useAnimationControls()

  useEffect(() => {
    nextFrame(() => {
      animateController.start(modalMontionConfig.animate)
    })
  }, [animateController])
  const noticeModal = useCallback(() => {
    animateController
      .start({
        scale: 1.05,
        transition: {
          duration: 0.06,
        },
      })
      .then(() => {
        animateController.start({
          scale: 1,
        })
      })
  }, [animateController])

  useLayoutEffect(() => {
    if (isTop) return
    animateController.start({
      scale: 0.96,
      y: 10,
    })
    return () => {
      try {
        animateController.stop()
        animateController.start({
          scale: 1,
          y: 0,
        })
      } catch {
        /* empty */
      }
    }
  }, [isTop])

  return {
    noticeModal,
    animateController,
    dismissing: useEventCallback(async () => {
      await animateController.start(modalMontionConfig.exit)
    }),
  }
}
