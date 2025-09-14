import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, useWindowDimensions, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const splashImage = require('../assets/images/splash-icon.png')

const BRAND = '#f7941d'

const Dots = ({ count, activeIndex }) => {
  return (
    <View style={styles.pagination}>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={[styles.dot, i === activeIndex && styles.dotActive]} />
      ))}
    </View>
  )
}

const SplashContent = () => {
  return (
    <View style={styles.splashContainer}>
      <Image source={splashImage} style={styles.splashLogo} resizeMode="contain" />
      <Text style={styles.splashTitle}>PAL</Text>
      <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
    </View>
  )
}

const OnboardingContent = () => {
  const slides = [
    {
      image: 'https://i.imgur.com/7Q0Xq6B.png',
      title: 'Adoptify - Where Furry Tales Begin',
      description:
        'Embark on a heartwarming journey to find your perfect companion. Swipe, match, and open your heart to a new furry friend.',
    },
    {
      image: 'https://i.imgur.com/6v6Xq0M.png',
      title: 'Explore a World of Companionship',
      description:
        'Discover a diverse array of adorable companions, find your favorites, and let the tail-wagging adventure begin.',
    },
    {
      image: 'https://i.imgur.com/3v3Xq1N.png',
      title: 'Connect with Caring Pet Owners Around You',
      description:
        'Easily connect with pet owners, ask about animals, & make informed decisions. Adoptify is here to guide you every step of the way.',
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const isLast = currentIndex === slides.length - 1
  const currentSlide = slides[currentIndex]

  return (
    <>
      <View style={styles.imageContainer}>
        <Image source={{ uri: currentSlide.image }} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>{currentSlide.title}</Text>
          <Text style={styles.description}>{currentSlide.description}</Text>
        </View>
        <View>
          <Dots count={slides.length} activeIndex={currentIndex} />
          <View style={styles.buttons}>
            {!isLast && (
              <TouchableOpacity style={[styles.button, styles.buttonGhost]} onPress={() => setCurrentIndex(slides.length - 1)}>
                <Text style={[styles.buttonText, styles.buttonGhostText]}>Skip</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (!isLast) setCurrentIndex((i) => i + 1)
                else alert("Onboarding complete!")
              }}
            >
              <Text style={styles.buttonText}>{isLast ? "Let's Get Started" : 'Continue'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  )
}

const Home = () => {
  const [showSplash, setShowSplash] = useState(true)
  const { width } = useWindowDimensions()

  useEffect(() => {
    const id = setTimeout(() => setShowSplash(false), 10000)
    return () => clearTimeout(id)
  }, [])

  const frameWidth = Math.max(320, Math.min(420, Math.floor(width - 32)))

  return (
    <SafeAreaView style={styles.root}>
      <View style={[styles.frame, { width: frameWidth }]}>
        {showSplash ? <SplashContent /> : <OnboardingContent />}
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  frame: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  splashContainer: {
    backgroundColor: BRAND,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  splashLogo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  splashTitle: {
    fontSize: 40,
    color: '#fff',
    fontWeight: '700',
  },
  imageContainer: {
    backgroundColor: BRAND,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  image: {
    maxHeight: 260,
    width: '100%',
    borderRadius: 16,
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    lineHeight: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  dotActive: {
    backgroundColor: BRAND,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: BRAND,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 30,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonGhost: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: BRAND,
  },
  buttonGhostText: {
    color: BRAND,
  },
})