import MeditationListItem from '@/components/MeditationListItem'
import { meditations } from '@/data'
import { FlatList } from 'react-native'

export default function Index() {
  return (
    <FlatList
      className="bg-white"
      contentContainerClassName="gap-8 p-4"
      data={meditations}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <MeditationListItem meditation={item} />}
    />
  )
}
