import React, { useState, useLayoutEffect } from 'react'
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'
import {
  GestureHandlerRootView,
  PanGestureHandler
} from 'react-native-gesture-handler'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS
} from 'react-native-reanimated'
import Header from '@components/reader/Header'
import PageView from '@components/reader/PageView'
import { useNavigation } from '@react-navigation/native'

const { width } = Dimensions.get('window')

const chapters = [
  {
    title: 'Chương 1: Khởi đầu',
    pages: [
      'Trang 1: Ngày xửa ngày xưa, có một vùng đất xa xôi...',
      'Trang 2: Ở đó, có một chàng hoàng tử...'
    ]
  },
  {
    title: 'Chương 2: Gặp gỡ định mệnh',
    pages: [
      'Trang 1: Một ngày nọ, hoàng tử gặp một cô gái bí ẩn...',
      'Trang 2: Cô gái đó chính là một phù thủy...'
    ]
  }
]

export default function ReaderScreen() {
  const [pageIndex, setPageIndex] = useState(0)
  const translateX = useSharedValue(0)
  const [currentChapter, setCurrentChapter] = useState(0)
  const pages = chapters[currentChapter].pages
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  const showHeader = useSharedValue(true)

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(showHeader.value ? 1 : 0, { duration: 300 }),
    transform: [
      {
        translateY: withTiming(showHeader.value ? 0 : -50, { duration: 300 })
      }
    ]
  }))

  const toggleHeader = () => {
    showHeader.value = !showHeader.value
  }

  const handlePageChange = (direction) => {
    const totalPages = chapters[currentChapter].pages.length
    showHeader.value = false

    if (direction === 'next') {
      if (pageIndex < totalPages - 1) {
        setPageIndex(pageIndex + 1)
      } else if (currentChapter < chapters.length - 1) {
        setCurrentChapter(currentChapter + 1)
        setPageIndex(0)
      }
    } else if (direction === 'prev') {
      if (pageIndex > 0) {
        setPageIndex(pageIndex - 1)
      } else if (currentChapter > 0) {
        const newChapter = currentChapter - 1
        setCurrentChapter(newChapter)
        setPageIndex(chapters[newChapter].pages.length - 1)
      }
    }

    translateX.value = 0
  }

  const animatedStyleCurrent = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }))
  const animatedStyleNext = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value + width }]
  }))
  const animatedStylePrev = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value - width }]
  }))

  const onGestureEvent = (event) => {
    const x = event.nativeEvent.translationX
    translateX.value = x
  }

  const onGestureEnd = (event) => {
    const x = event.nativeEvent.translationX
    if (x < -width * 0.3) {
      translateX.value = withTiming(-width, {}, () => {
        runOnJS(handlePageChange)('next')
      })
    } else if (x > width * 0.3) {
      translateX.value = withTiming(width, {}, () => {
        runOnJS(handlePageChange)('prev')
      })
    } else {
      translateX.value = withTiming(0)
    }
  }

  const handleTapRegion = (e) => {
    const tapX = e.nativeEvent.locationX
    if (tapX < width * 0.3) {
      handlePageChange('prev')
    } else if (tapX > width * 0.7) {
      handlePageChange('next')
    } else {
      toggleHeader()
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Animated.View style={{ flex: 1 }}>
        <Header
          animatedStyle={headerAnimatedStyle}
          title="Tên truyện: Hoàng Tử & Con Rồng"
          chapter={chapters[currentChapter].title}
        />

        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onEnded={onGestureEnd}
        >
          <Animated.View style={{ flex: 1 }}>
            {/* Toàn bộ vùng đọc sách có thể chạm */}
            <TouchableWithoutFeedback onPress={handleTapRegion}>
              <View style={{ flex: 1 }}>
                <PageView
                  pages={pages}
                  pageIndex={pageIndex}
                  animatedStyleCurrent={animatedStyleCurrent}
                  animatedStyleNext={animatedStyleNext}
                  animatedStylePrev={animatedStylePrev}
                />
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </GestureHandlerRootView>
  )
}
