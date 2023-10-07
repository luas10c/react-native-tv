import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  StatusBar,
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native'

import Video from 'react-native-video'

import ArrowRight from './assets/arrow-left.svg'

import Sbt from './assets/sbt.svg'

interface Channel {
  id: string
  type: 'youtube' | 'from'
  title: string
  channel_id: number
  uri: string
}

const App = () => {
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [channels, setChannels] = useState<Channel[]>([])
  const [channel, setChannel] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetch(
          'https://4335-168-90-76-162.ngrok-free.app/channels'
        )
        const data = await response.json()
        setChannels(data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" backgroundColor="#161616" translucent />
      <FlatList
        data={channels}
        contentContainerStyle={{ gap: 8, paddingTop: 32, paddingBottom: 48 }}
        style={{ padding: 16 }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                backgroundColor: '#222222',
                height: 64,
                borderRadius: 8,
                justifyContent: 'center'
              }}
              onPress={() => setChannel(item.channel_id)}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <View style={{ width: 80 }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#FFFFFF',
                      fontSize: 18
                    }}
                  >
                    {item.channel_id}
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Text style={{ color: '#FFFFFF' }}>{item.title}</Text>

                  <Sbt width={24} height={24} />
                </View>
              </View>
            </TouchableOpacity>
          )
        }}
      />

      <Modal visible={!!channel}>
        <StatusBar barStyle="default" backgroundColor="#000000" translucent />
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: '#000000'
          }}
        >
          <TouchableOpacity
            style={{
              position: 'absolute',
              zIndex: 1,
              top: 16,
              right: 16,
              backgroundColor: '#000000',
              padding: 8,
              borderRadius: 30
            }}
            onPress={() => setChannel(null)}
          >
            <ArrowRight width={24} height={24} color="#FFFFFF" />
          </TouchableOpacity>

          {loading && (
            <View
              style={{
                position: 'absolute',
                zIndex: 2,
                backgroundColor: '#000000',
                width: '100%',
                height: '100%',
                top: '50%'
              }}
            >
              <Text
                style={{ color: '#FFFFFF', fontSize: 18, textAlign: 'center' }}
              >
                Loading...
              </Text>
            </View>
          )}

          <Video
            source={{
              uri: `https://4335-168-90-76-162.ngrok-free.app/stream?channel_id=${channel}`
            }}
            style={{
              backgroundColor: 'rgba(100, 100, 100, .1)',
              width: '100%',
              height: '100%',
              aspectRatio: 1.9
            }}
            rate={1}
            volume={100}
            resizeMode="contain"
            frameQuality={100}
            onLoad={() => setLoading(false)}
            onProgress={(data) => {
              setCurrentTime(data.currentTime)

              if (currentTime === data.currentTime) {
                setLoading(true)
              }

              if (currentTime !== data.currentTime) {
                setLoading(false)
              }
            }}
            fullscreen
          />
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616'
  }
})

export default App
