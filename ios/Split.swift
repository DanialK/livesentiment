//
//  SplitSequence.swift
//  Movement
//
//  Created by Stefano J. Attardi on 1/19/18.
//  Copyright © 2018 Rational Creation. All rights reserved.
//

import CoreML


@objc(Sentiment)
class Sentiment: NSObject {

  var model: AnyObject? = nil
  
  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc(check:callback:)
  func check(points: [[Float32]], callback: RCTResponseSenderBlock) {
    print("checking")
    if let path = Bundle.main.path(forResource: "word_index", ofType: "json") {
      do {
        let data = try Data(contentsOf: URL(fileURLWithPath: path), options: .mappedIfSafe)
        let jsonResult = try JSONSerialization.jsonObject(with: data, options: .mutableLeaves)
        if let jsonResult = jsonResult as? Dictionary<String, Int16> {
          // do stuff
          print(jsonResult["woods"])
          let probability = CGFloat(Float(arc4random()) / Float(UINT32_MAX))
          callback([NSNull(), probability])
        }
      } catch {
        // handle error
        callback([NSNull(), 0.69])
      }
    }
  }
}

