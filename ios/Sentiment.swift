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
  func check(text: [NSNumber], callback: RCTResponseSenderBlock) {
    if #available(iOS 11.0, *) {
      let model = SentimentModel()

      guard let input_data = try? MLMultiArray(shape:[1000, 1, 1], dataType:.double) else {
        fatalError("Unexpected runtime error. MLMultiArray")
      }

      for (index, item) in text.enumerated() {
        input_data[index] = item
      }
      
      let i = SentimentModelInput(input: input_data)

      let sentiment_prediction = try! model.prediction(fromFeatures: i)
      print(sentiment_prediction.output.count)
      print(sentiment_prediction.output[0]?.doubleValue)
//      if(sentiment_prediction.output[0]?.doubleValue >= 0.5) {
//        print("positive!")
//      } else {
//        print("negative!")
//      }

      
      
      let probability = Float(Float(arc4random()) / Float(UINT32_MAX))
      callback([NSNull(), probability])
    } else {
      print("NATT")
    }
  }
}



