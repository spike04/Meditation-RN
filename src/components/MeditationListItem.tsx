import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Meditation } from '@/types'
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons'
import { Link } from 'expo-router'

export default function MeditationListItem({
  meditation,
}: {
  meditation: Meditation
}) {
  return (
    <Link href={`/meditation/${meditation.id}`} asChild>
      <Pressable className="flex-row items-center gap-4">
        <View className="bg-green-700 p-2 rounded-full">
          <FontAwesome name="check" size={16} color="white" />
        </View>
        <View className="flex-1 p-4 py-8 border-2 border-gray-300 rounded-2xl">
          <Text className="font-semibold text-2xl">{meditation.title}</Text>

          <View className="flex-row items-center gap-1">
            <FontAwesome6 name="clock" size={16} color="#6B7280" />
            <Text className="text-gray-600">{meditation.duration} min</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  )
}
