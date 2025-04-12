import React from 'react'
import { Text, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'

const PageView = ({
  pages,
  pageIndex,
  animatedStyleCurrent,
  animatedStyleNext,
  animatedStylePrev
}) => {
  return (
    <>
      {pageIndex < pages.length - 1 && (
        <Animated.View
          style={[styles.page, styles.nextPage, animatedStyleNext]}
        >
          <Text style={styles.pageText}>{pages[pageIndex + 1]}</Text>
          <Text style={styles.pageNumber}>Trang {pageIndex + 2}</Text>
        </Animated.View>
      )}

      {pageIndex > 0 && (
        <Animated.View
          style={[styles.page, styles.prevPage, animatedStylePrev]}
        >
          <Text style={styles.pageText}>{pages[pageIndex - 1]}</Text>
          <Text style={styles.pageNumber}>Trang {pageIndex}</Text>
        </Animated.View>
      )}

      <Animated.View style={[styles.page, animatedStyleCurrent]}>
        <Text style={styles.pageText}>{pages[pageIndex]}</Text>
        <Text style={styles.pageNumber}>Trang {pageIndex + 1}</Text>
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  page: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    padding: 24,
    justifyContent: 'center'
  },
  pageText: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'justify'
  },
  pageNumber: {
    marginTop: 16,
    fontSize: 14,
    textAlign: 'center',
    color: 'gray'
  },
  nextPage: { zIndex: 1 },
  prevPage: { zIndex: 1 }
})

export default PageView
