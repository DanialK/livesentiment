


//: Playground - noun: a place where people can play

import UIKit

var str = "Hello, playgrounddddd"
print(str)

let mapping = [
    "terrible": 1.0,
    "great": 2.0,
    "bad": 3.0,
    "good": 4.0,
    "awful": 5.0,
    "awesome": 6.0
]
func padArray(to numToPad: Int, sequence: [NSNumber]) -> [NSNumber] {
    var newSeq = sequence
    for _ in sequence.count ... numToPad {
        newSeq.insert(NSNumber(value:0.0), at: 0)
    }
    return newSeq
}

func tokenizer(words: [String]) -> [NSNumber] {
    var tokens : [NSNumber] = []
    for (index, word) in words.enumerated() {
        if let val = mapping[word] {
            tokens.insert(NSNumber(value: val), at: index)
        } else {
            tokens.insert(NSNumber(value: 0.0), at: index)
        }
    }
    return padArray(to: 79, sequence: tokens)
}

let text = ["Good boy gone bad"]
var wordArrays : [[String]] = []
for sent in text {
    wordArrays.append(sent.characters.split{$0 == " "}.map(String.init))
}

wordArrays
//print("checking")
//if let path = Bundle.main.path(forResource: "word_index", ofType: "json") {
//    do {
//        let data = try Data(contentsOf: URL(fileURLWithPath: path), options: .mappedIfSafe)
//        let jsonResult = try JSONSerialization.jsonObject(with: data, options: .mutableLeaves)
//        if let jsonResult = jsonResult as? Dictionary<String, Int16> {
//            // do stuff
//            print("Gonna show woods")
//            print(jsonResult["woods"] as Any)
//        }
//    } catch {
//        // handle error
//        print("error")
//    }
//}

