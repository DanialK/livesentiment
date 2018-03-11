//
//  Sentiment.swift
//  LiveSentiment
//
//  Created by Danial Khosravi on 11/3/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

//import CoreML

@objc(Sentiment)
class Sentiment: NSObject {
  let model = SentimentModel()
  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  @objc(check:callback:)
  func check(text: [NSNumber], callback: RCTResponseSenderBlock) {
    print("checking", text.count)
    
    if #available(iOS 11.0, *) {
      //      guard let input_data = try? MLMultiArray(shape:[1000,1,1], dataType:.double) else {
      //        fatalError("Unexpected runtime error. MLMultiArray")
      //      }
      //      for (index, item) in text.enumerated() {
      //        input_data[index] = item
      //      }
      //      let i = SentimentModelInput(input: input_data)
      //      let model = Split
      //      let sentiment_prediction = try model.prediction(input: i)
      //      if(sentiment_prediction.sentiment[0].doubleValue >= 0.5) {
      //        print("positive!")
      //      } else {
      //        print("negative!")
      //      }
      //      self.query()
      
      //      let sentiment_prediction = try model.prediction(input: text)
      //      if (sentiment_prediction) {
      //        print(sentiment_prediction)
      //      }
      let probability = Float(Float(arc4random()) / Float(UINT32_MAX))
      callback([NSNull(), probability])
      
    } else {
      print("NATT")
    }
  }
}



