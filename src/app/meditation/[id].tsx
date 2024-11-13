import { meditations } from '@/data'
import {
  AntDesign,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import { router, useLocalSearchParams } from 'expo-router'
import { Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio'
import audio from '@assets/meditations/audio1.mp3'

export default function MeditationDetails() {
  const { id } = useLocalSearchParams<{ id: string }>()

  const player = useAudioPlayer(audio)
  const status = useAudioPlayerStatus(player)

  const meditation = meditations.find((m) => m.id === Number(id))

  if (!meditation) {
    return <Text>Meditation Not Found</Text>
  }

  const formatSeconds = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000)
    const seconds = Math.floor((milliseconds % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <SafeAreaView className="bg-orange-400 flex-1 p-2 justify-between">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-1">
          <View className="flex-row items-center justify-between p-4">
            <AntDesign
              onPress={() => router.back()}
              name="infocirlceo"
              size={24}
              color="black"
            />

            <View className="bg-zinc-800 p-2 rounded-md">
              <Text className="text-zinc-100 font-semibold">
                Today's Meditation
              </Text>
            </View>

            <AntDesign
              onPress={() => router.back()}
              name="close"
              size={24}
              color="black"
            />
          </View>
          <Text className="text-2xl mt-8 text-center text-zinc-800 font-semibold">
            {meditation?.title}
          </Text>
        </View>

        {/* Play Pause Button */}
        <Pressable
          onPress={() => (player.playing ? player.pause() : player.play())}
          className="bg-zinc-800 self-center size-20 aspect-square items-center justify-center rounded-full"
        >
          <FontAwesome6
            name={status.playing ? 'pause' : 'play'}
            size={24}
            color="snow"
            className={!status.playing && 'ml-1'}
          />
        </Pressable>

        <View className="flex-1">
          {/* Footer: Player */}
          <View className="p-4 mt-auto gap-4">
            <View className="flex-row justify-between">
              {/* <FontAwesome6 name="play" size={24} color="#3A3937" /> */}
              <MaterialIcons name="airplay" size={24} color="#3A3937" />
              <MaterialCommunityIcons
                name="cog-outline"
                size={24}
                color="#3A3937"
              />
            </View>
            {/* Playback indicator */}
            <View>
              <Slider
                style={{ width: '100%', height: 3 }}
                minimumValue={0}
                maximumValue={1}
                value={status.currentTime / status.duration}
                onSlidingComplete={(value) =>
                  player.seekTo(value * status.duration)
                }
                minimumTrackTintColor="#3A3937"
                maximumTrackTintColor="#3A397375"
                thumbTintColor="#3A3937"
              />
            </View>
            <View className="flex-row justify-between">
              <Text className="text-xs">
                {formatSeconds(status.currentTime)}
              </Text>
              <Text className="text-xs">{formatSeconds(status.duration)}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
