import React, { useState, useLayoutEffect } from 'react'
import {
  View,
  Text,
  Dimensions,
  // StyleSheet,
  TouchableWithoutFeedback,
  // ScrollView,
  // TouchableOpacity,
  // Pressable
} from 'react-native'
import {
  GestureHandlerRootView,
  PanGestureHandler
  // Pressable
} from 'react-native-gesture-handler'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS
} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
// import { Feather } from '@expo/vector-icons'
// import { useRouter } from 'expo-router'
// import { Platform } from 'react-native'
import Header from './Header'

const { width, height } = Dimensions.get('window')

export default function BookReaderScreen({ bookId }) {
  const book = {
    title: 'The Great Gatsby',
    chapters: [
      {
        title: 'Chapter 1',
        order: 1,
        pages: [
          {
            order: 1,
            content:
              'In my younger and more vulnerable years, my father gave me some advice that I’ve been turning over in my mind ever since.'
          },
          {
            order: 2,
            content:
              '"Whenever you feel like criticizing anyone," he told me, "just remember that all the people in this world haven’t had the advantages that you’ve had."'
          },
          {
            order: 3,
            content:
              'He didn’t say any more but we’ve always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that.'
          },
          {
            order: 4,
            content:
              'As a result, I’m inclined to reserve all judgments, a habit that has opened up many curious natures to me.'
          }
        ]
      },
      {
        title: 'Chapter 2',
        order: 2,
        pages: [
          {
            order: 1,
            content:
              'About halfway between West Egg and New York the motor road hastily joins the railroad and runs beside it for a quarter of a mile.'
          },
          {
            order: 2,
            content:
              'This is a valley of ashes—a fantastic farm where ashes grow like wheat into ridges and hills and grotesque gardens.'
          },
          {
            order: 3,
            content:
              'Occasionally a line of gray cars crawls along an invisible track, gives out a ghastly creak, and comes to rest.'
          },
          {
            order: 4,
            content:
              'The only building in sight is a small block of yellow brick sitting on the edge of the waste land.'
          }
        ]
      },
      {
        title: 'Chapter 3',
        order: 3,
        pages: [
          {
            order: 1,
            content:
              'There was music from my neighbor’s house through the summer nights. In his blue gardens men and girls came and went like moths.'
          },
          {
            order: 2,
            content:
              'The lights grew brighter as the earth lurches away from the sun, and now the orchestra is playing yellow cocktail music.'
          },
          {
            order: 3,
            content:
              'People were not invited—they went there. They got into automobiles which bore them out to Long Island and somehow ended up at Gatsby’s door.'
          },
          {
            order: 4,
            content:
              'This is where I saw him for the first time: the man behind the legend, standing alone and smiling in his garden.'
          }
        ]
      },
      {
        title: 'Chapter 4',
        order: 4,
        pages: [
          {
            order: 1,
            content:
              'On Sunday morning while church bells rang in the villages alongshore, the world and its mistress returned to Gatsby’s house.'
          },
          {
            order: 2,
            content:
              'I remember the list of those who attended, a compilation of names that read like a social register of the Jazz Age.'
          },
          {
            order: 3,
            content:
              'One morning Gatsby invited me on a drive. "I’m going to tell you something about my life," he said.'
          },
          {
            order: 4,
            content:
              'And so he began: "I am the son of some wealthy people in the Middle West—all dead now. Educated at Oxford, like I told you."'
          }
        ]
      }
    ]
  }

  const navigation = useNavigation()
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [pageKey, setPageKey] = useState(0)

  const chapter = book.chapters[currentChapterIndex]
  const page = chapter.pages[currentPageIndex]

  const translateX = useSharedValue(0)

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  const toggleHeader = () => {
    setIsHeaderVisible((prev) => !prev)
  }

  const handleNextPage = () => {
    setIsHeaderVisible(false)
    animateTo(-width, () => {
      if (currentPageIndex < chapter.pages.length - 1) {
        setCurrentPageIndex((prev) => prev + 1)
      } else if (currentChapterIndex < book.chapters.length - 1) {
        setCurrentChapterIndex((prev) => prev + 1)
        setCurrentPageIndex(0)
      }
      setPageKey((k) => k + 1)
      translateX.value = 0
    })
  }

  const handlePrevPage = () => {
    setIsHeaderVisible(false)
    animateTo(width, () => {
      if (currentPageIndex > 0) {
        setCurrentPageIndex((prev) => prev - 1)
      } else if (currentChapterIndex > 0) {
        const prevChapter = book.chapters[currentChapterIndex - 1]
        setCurrentChapterIndex((prev) => prev - 1)
        setCurrentPageIndex(prevChapter.pages.length - 1)
      }
      setPageKey((k) => k + 1)
      translateX.value = 0
    })
  }

  const handleTap = (e) => {
    const tapX = e.nativeEvent.locationX
    if (tapX < width * 0.3) {
      handlePrevPage()
    } else if (tapX > width * 0.7) {
      handleNextPage()
    } else {
      toggleHeader()
    }
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }))

  const animateTo = (value, callback) => {
    translateX.value = withTiming(value, { duration: 300 }, (finished) => {
      if (finished) runOnJS(callback)()
    })
  }

  const onGestureEvent = (event) => {
    translateX.value = event.nativeEvent.translationX
  }

  const onGestureEnd = (event) => {
    const x = event.nativeEvent.translationX
    if (x < -width * 0.25) {
      handleNextPage()
    } else if (x > width * 0.25) {
      handlePrevPage()
    } else {
      animateTo(0, () => {})
    }
  }

  return (
    <GestureHandlerRootView
      style={{
        flex: 1
      }}
    >
      <PanGestureHandler onGestureEvent={onGestureEvent} onEnded={onGestureEnd}>
        <Animated.View
          style={{
            flex: 1
          }}
        >
          <TouchableWithoutFeedback onPress={handleTap}>
            <View
              style={{
                backgroundColor: '#fff',
                flex: 1
              }}
            >
              {/* Header  */}
              {isHeaderVisible && (
                <Header
                  title={book.title}
                  chapter={book.chapters[currentChapterIndex].title}
                />
              )}

              {/* Content  */}
              <Animated.View
                key={pageKey}
                style={[
                  {
                    flex: 1,
                    // paddingTop: isHeaderVisible ? 80 : 24,
                    paddingHorizontal: 24,
                    justifyContent: 'center'
                  },
                  animatedStyle
                ]}
              >
                <Text style={{ fontSize: 18, lineHeight: 28 }}>
                  {page.content}
                </Text>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  )
}
