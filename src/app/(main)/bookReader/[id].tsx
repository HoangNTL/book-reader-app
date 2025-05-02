import React, { useState, useLayoutEffect, useEffect } from 'react'
import { Text, Dimensions, TouchableWithoutFeedback } from 'react-native'
import {
  GestureHandlerGestureEvent,
  GestureHandlerRootView,
  PanGestureHandler
} from 'react-native-gesture-handler'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS
} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import Header from './Header'
import { useLocalSearchParams } from 'expo-router'
import { supabase } from '@/lib/supabase'

const { width, height } = Dimensions.get('window')

interface Chapter {
  id: number
  title: string
  chapter_order: number
}

interface Page {
  id: number
  content: string
  page_order: number
  chapter_id: number
}

export default function BookReaderScreen() {
  const { id, title } = useLocalSearchParams<{ id: string; title: string }>()

  const navigation = useNavigation()
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null)
  const [pages, setPages] = useState<Page[]>([])
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [pageKey, setPageKey] = useState(0)

  const translateX = useSharedValue<number>(0)

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  useEffect(() => {
    loadFirstChapter()
  }, [])

  const loadFirstChapter = async () => {
    const { data: chapter, error: chapterError } = await supabase
      .from('chapters')
      .select('*')
      .eq('book_id', id) // id lấy từ useLocalSearchParams
      .order('chapter_order', { ascending: true })
      .limit(1)
      .single()

    // console.log('chapter', chapter)

    if (chapterError || !chapter) {
      console.error('Error loading first chapter', chapterError)
      return
    }

    setCurrentChapter(chapter)

    // Load pages
    fetchPages(chapter.id)
  }

  const fetchPages = async (chapterId: any) => {
    const { data: pageList, error: pageError } = await supabase
      .from('pages')
      .select('*')
      .eq('chapter_id', chapterId)
      .order('page_order', { ascending: true })

    // console.log('pages', pageList)

    if (pageError || !pageList) {
      console.error('Error loading pages', pageError)
      return
    }

    setPages(pageList)
    setCurrentPageIndex(0)
  }

  const toggleHeader = () => {
    setIsHeaderVisible((prev) => !prev)
  }

  const handleNextPage = () => {
    setIsHeaderVisible(false)
    animateTo(-width, async () => {
      if (currentPageIndex < pages.length - 1) {
        setCurrentPageIndex((prev) => prev + 1)
      } else {
        // Load next chapter
        const { data: nextChapter, error: nextChapterError } = await supabase
          .from('chapters')
          .select('*')
          .eq('book_id', id)
          .gt('chapter_order', currentChapter?.chapter_order || 0)
          .order('chapter_order', { ascending: true })
          .limit(1)
          .single()

        if (!nextChapter || nextChapterError) {
          console.log('Last chapter')
          translateX.value = 0
          return
        }

        setCurrentChapter(nextChapter)
        fetchPages(nextChapter.id)
      }
      setPageKey((k) => k + 1)
      translateX.value = 0
    })
  }

  const handlePrevPage = () => {
    setIsHeaderVisible(false)
    animateTo(width, async () => {
      if (currentPageIndex > 0) {
        setCurrentPageIndex((prev) => prev - 1)
      } else {
        // Load previous chapter
        const { data: prevChapter, error: prevChapterError } = await supabase
          .from('chapters')
          .select('*')
          .eq('book_id', id)
          .lt('chapter_order', currentChapter?.chapter_order || 0)
          .order('chapter_order', { ascending: false })
          .limit(1)
          .single()

        if (!prevChapter || prevChapterError) {
          console.log('First chapter')
          translateX.value = 0
          return
        }

        setCurrentChapter(prevChapter)
        fetchPages(prevChapter.id)
      }
      setPageKey((k) => k + 1)
      translateX.value = 0
    })
  }

  const handleTap = (e: any) => {
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

  const animateTo = (value: number, callback: () => void) => {
    translateX.value = withTiming(value, { duration: 300 }, (finished) => {
      if (finished) runOnJS(callback)()
    })
  }

  const onGestureEvent = (event: GestureHandlerGestureEvent) => {
    translateX.value = event.nativeEvent.translationX as number
  }

  const onGestureEnd = (event: GestureHandlerGestureEvent) => {
    const x = event.nativeEvent.translationX as number
    if (x < -width * 0.25) {
      handleNextPage()
    } else if (x > width * 0.25) {
      handlePrevPage()
    } else {
      animateTo(0, () => { })
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
          {/* Header  */}
          {isHeaderVisible && (
            <Header title={title || 'Unknow title'} chapter={currentChapter?.title || ''} />
          )}

          <TouchableWithoutFeedback onPress={handleTap}>
            <Animated.View
              key={pageKey}
              style={[
                {
                  flex: 1,
                  backgroundColor: '#fff',
                  paddingHorizontal: 24,
                  justifyContent: 'center'
                },
                animatedStyle
              ]}
            >
              {currentPageIndex === 0 && (
                <Text
                  style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}
                >
                  {currentChapter?.title || ''}
                </Text>
              )}
              <Text style={{ fontSize: 18, lineHeight: 28 }}>
                {pages[currentPageIndex]?.content || ''}
              </Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  )
}
