import { useEffect, useRef, useState } from "react";
import tfjs from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";

export default function useGestures() {
  const [gesture, setGesture] = useState();
  const video = useRef();
  const modelLoaded = useRef(false);

  useEffect(() => {
    if (!modelLoaded.current && gesture !== undefined) {
      handpose.load().then((net) => {
        navigator.mediaDevices
          .getUserMedia({
            video: true,
          })
          .then((stream) => {
            video.current.srcObject = stream;
            video.current.width = 720;
            video.current.height = 480;

            const detect = async () => {
              const hand = await net.estimateHands(video.current);

              if (hand.length > 0) {
                const GE = new fp.GestureEstimator([
                  fp.Gestures.VictoryGesture,
                  fp.Gestures.ThumbsUpGesture,
                  //fp.Gestures.ThumbsDownGesture,
                ]);
                const gesture = GE.estimate(hand[0].landmarks, 4);
                if (
                  gesture.gestures !== undefined &&
                  gesture.gestures.length > 0
                ) {
                  const confidence = gesture.gestures.map(
                    (prediction) => prediction.confidence,
                  );
                  const maxConfidence = confidence.indexOf(
                    Math.max.apply(null, confidence),
                  );

                  console.log(gesture.gestures[maxConfidence].name);
                  setGesture(gesture.gestures[maxConfidence].name);
                }
              }
            };

            modelLoaded.current = true;
            console.log("Handpose model loaded.");

            setInterval(() => {
              detect();
            }, 60);
          });
      });
    }
  }, []);

  return gesture, video;
}
