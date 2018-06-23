//
//  SentimentBridge.m
//  LiveSentiment
//
//  Created by Danial Khosravi on 11/3/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Sentiment, NSObject)

RCT_EXTERN_METHOD(check:(NSArray<NSNumber *> *)text callback:(RCTResponseSenderBlock *)callback)

@end

#import <React/RCTConvert.h>

@interface RCTConvert (RCTConvertNSNumberArrayArray)
@end

@implementation RCTConvert (RCTConvertNSNumberArrayArray)
+ (NSArray<NSArray<NSNumber *> *> *)NSNumberArrayArray:(id)json
{
  return RCTConvertArrayValue(@selector(NSNumberArray:), json);
}
@end



