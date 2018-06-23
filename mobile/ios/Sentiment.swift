//
//  Sentiment.swift
//  LiveSentiment
//
//  Created by Danial Khosravi on 11/3/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation
import CoreML

@objc(Sentiment)
class Sentiment: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  @objc(check:callback:)
  func check(text: [Int32], callback: RCTResponseSenderBlock) {
    if #available(iOS 11.0, *) {
      let model = SentimentModel()

      guard let input_data = try? MLMultiArray(shape:[256, 1, 1], dataType:.float32) else {
        fatalError("Unexpected runtime error. MLMultiArray")
      }

      for (index, item) in text.enumerated() {
        let indices = [NSNumber(value: index), NSNumber(value: 0), NSNumber(value: 0)]
        input_data[indices] = NSNumber(value: item)
      }

      let model_input = SentimentModelInput(input: input_data)
      do {
        let sentiment_prediction = try model.prediction(fromFeatures: model_input)
        callback([NSNull(), sentiment_prediction.output[0]])
      } catch {
        print("ERROR")
      }
    } else {
      print("NATT")
    }
  }
}



